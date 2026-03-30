import Image from "next/image";
import { useMemo, useState } from "react";
import style from "../../style/dashboard.module.css";

type DashboardPageProps = {
  user: {
    id: string;
    first_name?: string;
    username: string;
    email?: string;
  };
  onApplyLoan: () => void;
  onPayLoan: () => void;
  onViewPayments: () => void;
};

type ActivityItem = {
  id: string;
  date: string;
  description: string;
};

type SortType = "recent" | "oldest";

const recentActivities: ActivityItem[] = [
  /* Replace this with actual recent activities from the db */
  {
    id: "activity-1",
    date: "Jan-01-1999",
    description: "Payment of P1000 made for Loan #1234",
  },
  {
    id: "activity-2",
    date: "Dec-15-1998",
    description: "Loan #1234 approved with a credit limit of P5000",
  },
  {
    id: "activity-3",
    date: "Dec-15-1998",
    description: "Loan #1234 approved with a credit limit of P5000",
  },
  {
    id: "activity-4",
    date: "Dec-15-2038",
    description: "Loan #1234 approved with a credit limit of P5000",
  },
  /* till here */
];

const notifications: ActivityItem[] = [
  /* Replace this with actual notifications from the db */
  {
    id: "notification-1",
    date: "Jan-05-1999",
    description: "Payment of P1000 due for Loan #1234 on Jan-09-1999",
  },
  {
    id: "notification-2",
    date: "Jan-03-1999",
    description: "Payment of P1000 due for Loan #1234 on Jan-09-1999",
  },
  {
    id: "notification-3",
    date: "Jan-02-1999",
    description: "Payment of P1000 due for Loan #1234 on Jan-09-1999",
  },
  {
    id: "notification-4",
    date: "Jan-01-2026",
    description: "Payment of P1000 due for Loan #1234 on Jan-09-1999",
  },
  /* till here */
];

const monthMap: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

function parseActivityDate(date: string): number {
  const [monthLabel, dayLabel, yearLabel] = date.split("-");
  const month = monthMap[monthLabel] ?? 0;
  const day = Number(dayLabel) || 1;
  const year = Number(yearLabel) || 1970;

  return new Date(year, month, day).getTime();
}

export default function DashboardPage({ user, onApplyLoan, onPayLoan, onViewPayments }: DashboardPageProps) {
  const [activitySortType, setActivitySortType] = useState<SortType>("recent");
  const [notificationSortType, setNotificationSortType] = useState<SortType>("recent");
  const [notificationDate, setNotificationDate] = useState("");

  const sortedActivities = useMemo(() => {
    const activities = [...recentActivities];

    activities.sort((a, b) => {
      const aTime = parseActivityDate(a.date);
      const bTime = parseActivityDate(b.date);

      return activitySortType === "recent" ? bTime - aTime : aTime - bTime;
    });

    return activities;
  }, [activitySortType]);

  const sortedNotifications = useMemo(() => {
    const items = [...notifications];

    const filteredItems = notificationDate
      ? items.filter((item) => {
          const itemTime = parseActivityDate(item.date);
          const selectedTime = new Date(notificationDate).getTime();
          return itemTime === selectedTime;
        })
      : items;

    filteredItems.sort((a, b) => {
      const aTime = parseActivityDate(a.date);
      const bTime = parseActivityDate(b.date);

      return notificationSortType === "recent" ? bTime - aTime : aTime - bTime;
    });

    return filteredItems;
  }, [notificationDate, notificationSortType]);

  const handleActivitySortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActivitySortType(event.target.value as SortType);
  };

  const handleNotificationSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNotificationSortType(event.target.value as SortType);
  };

  const handleNotificationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationDate(event.target.value);
  };

  return (
    <main className="wrapper" style={{ gap: "1.5em" , paddingBottom: "0"}}>
      <div className={style["top-container"]}>
        <h1 className={style["welcome"]}>
          Welcome, <span>{user.username}</span>
        </h1>

        <div className={style["data-container"]}>
          {/* Loan Overview */}
          <div className={style["data-item"]}>
            <h2>Loan Overview</h2>
            <div className={style["data-card"]}>
              <div className={style["stats-grid"]}>
                <div className={style.stat}>
                  <span className={style["stat-label"]}>Active Loans</span>
                  <strong className={style["stat-value"]}>
                    {/* Current Loan Count  sample =>*/}2
                  </strong>
                </div>
                <div className={style.stat}>
                  <span className={style["stat-label"]}>Remaining Balance</span>
                  <strong className={style["stat-value"]}>
                    &#8369;{/* Remaining Balance  sample =>*/}1
                  </strong>
                </div>
                <div className={style.stat}>
                  <span className={style["stat-label"]}>Next Payment Due Date</span>
                  <strong className={style["stat-value"]}>
                    {/* Next Payment Due Date sample => */}Jan-09-1999
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Account Summary */}
          <div className={style["data-item"]}>
            <h2>Account Summary</h2>
            <div className={style["card-container"]}>
              <div className={style["data-card"]}>
                <span className={style["stat-label"]}>Credit Limit</span>
                <strong className={style["stat-value"]}>
                  &#8369;{/* Credit Limit sample =>*/}1111
                </strong>
              </div>
              <div className={style["data-card"]}>
                <span className={style["stat-label"]}>Payment Status</span>
                <strong className={style["stat-value"]}>
                  {/* Payment Status sample =>*/}Pending
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style["quick-actions"]}>
        <h2>Quick Actions</h2>
        <div className={style["button-container"]}>
          <button type="button" onClick={onApplyLoan}>
            <Image
              src="/images/checklist.png"
              alt="Apply Loan"
              width={24}
              height={24}
              className={style["button-icon"]}
            />
            Apply Loan
          </button>
          <button type="button" onClick={onPayLoan}>
            <Image
              src="/images/payment-method.png"
              alt="Pay Loan"
              width={24}
              height={24}
              className={style["button-icon"]}
            />
            Pay Loan
          </button>
          <button type="button" onClick={onViewPayments}>
            <Image
              src="/images/calendar-salary.png"
              alt="View Loan History"
              width={24}
              height={24}
              className={style["button-icon"]}
            />
            View Loan History
          </button>
        </div>
      </div>

      <div className={style["bottom-container"]}>
        <div className={style["bottom-card"]}>
          <h2>Recent Activity</h2>
          <div className={`${style["data-card"]} ${style["activity-card"]}`}>
            <select
              name="activitySortType"
              id="activitySortType"
              className={style["sorting"]}
              value={activitySortType}
              onChange={handleActivitySortChange}
            >
              <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
            </select>
            <div className={style["activity-list"]}>
              <ul>
                {sortedActivities.map((activity) => (
                  <li key={activity.id}>
                    <span className={style["activity-date"]}>{activity.date}</span>
                    <span className={style["activity-description"]}>{activity.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={style["bottom-card"]}>
          <h2>Notifications</h2>
          <div className={style["data-card"]}>
            <div className={style["sorting-container"]}>
              <select
                name="notificationSortType"
                id="notificationSortType"
                className={style["sorting"]}
                value={notificationSortType}
                onChange={handleNotificationSortChange}
              >
                <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest</option>
              </select>
              <input
                type="date"
                name="notificationDate"
                id="notificationDate"
                className={style["sorting"]}
                value={notificationDate}
                onChange={handleNotificationDateChange}
              />
            </div>

            <div className={style["activity-list"]}>
              {sortedNotifications.length > 0 ? (
                <ul>
                  {sortedNotifications.map((notification) => (
                    <li key={notification.id}>
                      <span className={style["activity-date"]}>{notification.date}</span>
                      <span className={style["activity-description"]}>{notification.description}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={style["empty-message"]}>No notification on this day</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
