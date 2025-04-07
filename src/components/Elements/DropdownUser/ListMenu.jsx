import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ListMenu(props) {
  const { menu = [] } = props;

  return (
    <ul className="py-1" role="none">
      {menu.map((item, index) => (
        <ListMenu.Details
          key={index}
          href={item.href}
          label={item.label}
          variant={item.variant}
        />
      ))}
      <li>
        <button
          onClick={() => {
            const elmt = document.querySelector("div[modal-backdrop]");
            if (elmt) {
              elmt.style.backgroundColor = "rgb(107 114 128 / 0.5)";
              elmt.classList.replace("z-40", "z-50");
            }
          }}
          data-modal-target="logout-modal"
          data-modal-toggle="logout-modal"
          className={`w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white`}
          role="menuitem"
        >
          Logout
        </button>
      </li>
    </ul>
  );
}

function Details(props) {
  const { href = "#", label = "No label", variant = "text-gray-700" } = props;
  return (
    <li>
      <Link
        to={href}
        className={`block px-4 py-2 text-sm ${variant} hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white`}
        role="menuitem"
      >
        {label}
      </Link>
    </li>
  );
}

ListMenu.Details = Details;

ListMenu.propTypes = {
  menu: PropTypes.array,
};

Details.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
};
