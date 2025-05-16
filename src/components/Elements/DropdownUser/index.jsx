import ListMenu from "./ListMenu";
import PropTypes from "prop-types";
import UserInfo from "./UserInfo";
import { identifyRole } from "../Role";

export default function DropdownUser(props) {
  const { profile } = props;

  return (
    <div className="flex items-center">
      <div className="flex items-center ms-3">
        <div>
          <button
            type="button"
            className="flex text-sm items-center text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
            aria-expanded="false"
            data-dropdown-toggle="dropdown-user"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="/images/no-profile.jpg"
              alt="user photo"
            />
            <span className="hidden sm:inline sm:mx-3">
              {profile?.role === "PERUSAHAAN"
                ? profile?.dataPengguna?.nama_perusahaan
                : profile?.dataPengguna?.nama || "Loading..."}{" "}
              <i className="ms-2 fa-solid fa-caret-down"></i>
            </span>
          </button>
        </div>
        <div
          className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
          id="dropdown-user"
        >
          <UserInfo
            name={
              profile?.role === "PERUSAHAAN"
                ? profile?.dataPengguna?.nama_perusahaan
                : profile?.dataPengguna?.nama
            }
            role={identifyRole(profile?.role)}
          />
          <ListMenu
            menu={[
              {
                href: "/profile",
                label: "Profil",
                variant: "text-gray-700 dark:text-gray-300",
              },
              {
                href: "/reset-password",
                label: "Ubah Password",
                variant: "text-gray-700 dark:text-gray-300",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

DropdownUser.propTypes = {
  profile: PropTypes.any,
};
