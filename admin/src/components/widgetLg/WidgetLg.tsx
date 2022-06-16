import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { format } from "timeago.js";
import "./widgetLg.css";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, []);

  const Button = ({ type }: any) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o: any) => (
            <tr className="widgetLgTr" key={o._id}>
              <td className="widgetLgUser">
                <span className="widgetLgName">{o.userId}</span>
              </td>
              <td className="widgetLgDate">{format(o.createdAt)}</td>
              <td className="widgetLgAmount">{o.amount}</td>
              <td className="widgetLgStatus">
                <Button type={o.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
