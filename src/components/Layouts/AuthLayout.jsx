import { Link, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";
import Credit from "../Elements/Credit";
import Logo from "../Elements/Logo";
import PropTypes from "prop-types";
import { refreshToken } from "../../services/auth/auth.service";

export default function AuthLayout(props) {
  const { children, title } = props;
  const { setProgress, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRefreshToken = useCallback(() => {
    setLoading(true);
    setProgress(30);
    refreshToken((status) => {
      setProgress(60);
      if (status) {
        navigate("/");
      }
      setProgress(100);
      setLoading(false);
    });
  }, [setProgress, setLoading, navigate]);

  useEffect(() => {
    handleRefreshToken();
  }, [handleRefreshToken]);

  return (
    <>
      <section className="bg-center bg-no-repeat bg-cover sm:bg-[url('https://masulyablog.sirv.com/bg.png')] h-screen sm:h-auto">
        <div className="flex flex-col items-end justify-center mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 h-screen">
            <div className="w-full h-full flex flex-col overflow-y-auto">
              <div className="flex-none sm:flex-1 bg-center bg-no-repeat bg-cover bg-[url('https://masulyablog.sirv.com/bg.png')] sm:bg-none h-1/4"></div>
              <div className="flex-none">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <Logo />
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    {title}
                  </h1>
                  {children}
                </div>
              </div>
              <div className="flex-1"></div>
              <div className="flex-none">
                <Credit />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function GuideLink(props) {
  const { children, href, label } = props;
  return (
    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
      {children}
      <Link
        to={href}
        className="font-medium text-primary-600 hover:underline dark:text-primary-500 ms-1"
      >
        {label}
      </Link>
    </p>
  );
}

AuthLayout.GuideLink = GuideLink;

AuthLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

GuideLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  label: PropTypes.string,
};
