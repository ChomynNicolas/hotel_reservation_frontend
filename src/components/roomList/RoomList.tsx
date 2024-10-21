import { Link } from "react-router-dom";

interface Props {
  id: string;
  type: string;
  number: string;
  price: string;
}

export const RoomList = ({ number, price, type,id }: Props) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {type}
      </th>
      <td className="px-6 py-4">{number}</td>
      <td className="px-6 py-4">{price}</td>
      <td className="px-6 py-4 text-right">
        <Link
          to={`/reservation/${id}`}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Reservar
        </Link>
      </td>
    </tr>
  );
};
