import React, { useState, useEffect, useMemo } from "react";
import { MdNotifications } from "react-icons/md";
import { parseISO, formatDistance } from "date-fns";
import pt from "date-fns/locale/pt";

import api from "~/services/api";

import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll
} from "./styles";

export interface INotification {
  _id: string;
  read: boolean;
  content: string;
  createdAt: string;
  timeDistance: string;
}

export interface INotifications {
  notifications: INotification[];
}

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    async function getNotifications() {
      const resp = await api.get<INotifications>("/notifications");

      const data = resp.data.notifications.map(notfication => ({
        ...notfication,
        timeDistance: formatDistance(
          parseISO(notfication.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        )
      }));

      setNotifications(data);
    }

    getNotifications();
  }, []);

  const hasUnred = useMemo(
    () => !!notifications.find(not => not.read === false),
    [notifications]
  );

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(id: string) {
    await api.put(`/notifications/${id}`);

    const updatedNotifications = notifications.map(not =>
      not._id === id ? { ...not, read: true } : not
    );

    setNotifications(updatedNotifications);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnred}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
