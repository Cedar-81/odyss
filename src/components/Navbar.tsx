"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { setShowAuth, logoutUser } from "../store/authSlice";

function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle sidebar open/close
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="h-[5rem] relative">
      {/* Navbar */}
      <nav className="h-[5rem] top-0 right-0 flex justify-between items-center w-full z-20 border-b border-b-brand px-6 lg:px-20 fixed bg-white">
        {/* Logo */}
        <svg
          viewBox="0 0 416 127"
          fill="none"
          className="h-8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M413.997 45.9793L395.121 47.1408C394.798 45.5275 394.105 44.0756 393.04 42.7849C391.975 41.462 390.572 40.4134 388.829 39.639C387.119 38.8323 385.07 38.429 382.683 38.429C379.488 38.429 376.794 39.1066 374.6 40.4618C372.406 41.7847 371.309 43.5593 371.309 45.7857C371.309 47.5603 372.019 49.0607 373.438 50.2868C374.858 51.5129 377.294 52.497 380.747 53.2391L394.202 55.9495C401.429 57.4337 406.818 59.8214 410.367 63.1125C413.916 66.4036 415.691 70.7273 415.691 76.0834C415.691 80.9556 414.255 85.2309 411.383 88.9092C408.544 92.5875 404.64 95.4592 399.671 97.5242C394.734 99.557 389.039 100.573 382.586 100.573C372.745 100.573 364.904 98.5245 359.064 94.4267C353.256 90.2966 349.852 84.6823 348.852 77.5838L369.131 76.519C369.744 79.5198 371.228 81.8107 373.584 83.3917C375.939 84.9405 378.956 85.7148 382.634 85.7148C386.248 85.7148 389.152 85.0211 391.346 83.6337C393.572 82.214 394.702 80.391 394.734 78.1646C394.702 76.2932 393.911 74.7605 392.362 73.5667C390.814 72.3406 388.426 71.4049 385.199 70.7596L372.325 68.1944C365.065 66.7424 359.661 64.2257 356.112 60.6442C352.595 57.0626 350.836 52.497 350.836 46.9472C350.836 42.1719 352.127 38.0579 354.708 34.6055C357.322 31.153 360.984 28.4911 365.695 26.6196C370.438 24.7482 375.987 23.8125 382.344 23.8125C391.733 23.8125 399.122 25.7969 404.511 29.7656C409.931 33.7343 413.093 39.1389 413.997 45.9793Z"
            fill="#F5008B"
          />
          <path
            d="M338.147 45.9793L319.271 47.1408C318.948 45.5275 318.255 44.0756 317.19 42.7849C316.125 41.462 314.721 40.4134 312.979 39.639C311.269 38.8323 309.22 38.429 306.832 38.429C303.638 38.429 300.944 39.1066 298.75 40.4618C296.556 41.7847 295.459 43.5593 295.459 45.7857C295.459 47.5603 296.168 49.0607 297.588 50.2868C299.008 51.5129 301.444 52.497 304.896 53.2391L318.351 55.9495C325.579 57.4337 330.967 59.8214 334.517 63.1125C338.066 66.4036 339.841 70.7273 339.841 76.0834C339.841 80.9556 338.405 85.2309 335.533 88.9092C332.694 92.5875 328.789 95.4592 323.82 97.5242C318.884 99.557 313.189 100.573 306.736 100.573C296.894 100.573 289.054 98.5245 283.214 94.4267C277.406 90.2966 274.002 84.6823 273.001 77.5838L293.281 76.519C293.894 79.5198 295.378 81.8107 297.733 83.3917C300.089 84.9405 303.106 85.7148 306.784 85.7148C310.398 85.7148 313.302 85.0211 315.496 83.6337C317.722 82.214 318.851 80.391 318.884 78.1646C318.851 76.2932 318.061 74.7605 316.512 73.5667C314.963 72.3406 312.576 71.4049 309.349 70.7596L296.475 68.1944C289.215 66.7424 283.811 64.2257 280.261 60.6442C276.744 57.0626 274.986 52.497 274.986 46.9472C274.986 42.1719 276.276 38.0579 278.858 34.6055C281.471 31.153 285.133 28.4911 289.844 26.6196C294.587 24.7482 300.137 23.8125 306.494 23.8125C315.883 23.8125 323.272 25.7969 328.66 29.7656C334.081 33.7343 337.243 39.1389 338.147 45.9793Z"
            fill="#F5008B"
          />
          <path
            d="M209.845 127C207.232 127 204.78 126.79 202.489 126.371C200.23 125.984 198.359 125.483 196.874 124.87L201.521 109.48C203.941 110.222 206.119 110.625 208.055 110.69C210.023 110.754 211.717 110.302 213.137 109.334C214.589 108.366 215.766 106.721 216.67 104.398L217.88 101.252L191.212 24.7812H212.895L228.285 79.3754H229.06L244.596 24.7812H266.424L237.53 107.156C236.142 111.157 234.255 114.642 231.867 117.611C229.512 120.611 226.527 122.918 222.913 124.532C219.299 126.177 214.943 127 209.845 127Z"
            fill="#F5008B"
          />
          <path
            d="M138.545 100.331C132.898 100.331 127.784 98.8792 123.202 95.9753C118.653 93.039 115.039 88.7315 112.361 83.0527C109.715 77.3416 108.392 70.3399 108.392 62.0475C108.392 53.5293 109.763 46.4469 112.506 40.8004C115.248 35.1216 118.895 30.8786 123.444 28.0714C128.026 25.232 133.043 23.8123 138.496 23.8123C142.658 23.8123 146.127 24.5222 148.902 25.9419C151.709 27.3293 153.968 29.0717 155.678 31.169C157.42 33.234 158.743 35.2668 159.647 37.2672H160.276V0H180.845V99.1212H160.518V87.215H159.647C158.679 89.2801 157.307 91.329 155.533 93.3617C153.79 95.3622 151.515 97.0239 148.708 98.3468C145.933 99.6697 142.546 100.331 138.545 100.331ZM145.078 83.9239C148.402 83.9239 151.209 83.0204 153.5 81.2136C155.823 79.3744 157.598 76.8093 158.824 73.5181C160.082 70.227 160.711 66.3712 160.711 61.9508C160.711 57.5303 160.098 53.6906 158.872 50.4318C157.646 47.1729 155.871 44.6562 153.548 42.8815C151.225 41.1069 148.402 40.2196 145.078 40.2196C141.69 40.2196 138.835 41.1392 136.512 42.9783C134.189 44.8175 132.43 47.3665 131.236 50.6254C130.042 53.8842 129.446 57.6594 129.446 61.9508C129.446 66.2744 130.042 70.0979 131.236 73.4213C132.462 76.7124 134.221 79.2937 136.512 81.1652C138.835 83.0043 141.69 83.9239 145.078 83.9239Z"
            fill="#F5008B"
          />
          <path
            d="M4.68159 71.8777C1.56173 65.3326 8.61251e-05 57.7794 8.73482e-06 49.2161C1.013e-05 40.6523 1.5615 33.0821 4.68159 26.5052L4.68159 71.8777Z"
            fill="#F5008B"
          />
          <path
            d="M16.3863 86.7775C15.1533 85.7747 13.9821 84.7102 12.874 83.5824L12.874 14.8288C13.9823 13.7055 15.1531 12.6441 16.3863 11.6442L16.3863 86.7775Z"
            fill="#F5008B"
          />
          <path
            d="M101.827 49.2161C101.827 59.1959 99.6874 67.8058 95.4072 75.0445C91.1698 82.326 85.2198 87.937 77.5582 91.8776C69.9394 95.8182 61.0364 97.788 50.8495 97.7881C45.6738 97.7881 40.8186 97.269 36.2834 96.2345L36.2834 82.5725L28.0895 82.5725L28.0895 93.6621C26.8925 93.1734 25.722 92.6423 24.5787 92.0668L24.5787 60.1447C24.7273 60.338 24.8805 60.5291 25.039 60.7167C27.6498 63.7576 31.2026 66.0489 35.6965 67.5909C40.1908 69.1757 45.3061 69.9681 51.0416 69.9682C56.7772 69.9682 61.8925 69.1757 66.3867 67.5909C70.8807 66.0489 74.4334 63.7576 77.0443 60.7167C79.6552 57.6756 80.9602 53.8844 80.9603 49.3442C80.9603 44.7611 79.6551 40.9062 77.0443 37.7795C74.4334 34.6955 70.8809 32.3605 66.3867 30.7757C61.8925 29.2337 56.7772 28.4625 51.0416 28.4625C45.3061 28.4625 40.1908 29.2337 35.6965 30.7757C31.2025 32.3605 27.6498 34.6956 25.039 37.7795C24.8806 37.9723 24.7273 38.168 24.5787 38.3663L24.5787 6.36385C25.722 5.78834 26.8925 5.25723 28.0895 4.76857L28.0895 20.5397L36.2834 20.5397L36.2834 2.19616C40.8185 1.16166 45.6739 0.642578 50.8495 0.642579C61.0363 0.642624 69.9394 2.61243 77.5582 6.55302C85.2198 10.4936 91.1697 16.0834 95.4072 23.3221C99.6874 30.6038 101.827 39.2359 101.827 49.2161Z"
            fill="#F5008B"
          />
        </svg>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <span className="font-semibold">Welcome, {user?.firstName}</span>
              <button
                onClick={() => dispatch(logoutUser())}
                className="text-brand hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col lg:flex-row gap-4">
              <button
                onClick={() => {
                  dispatch(setShowAuth("signin"));
                  setSidebarOpen(false);
                }}
                className="px-8 text-base py-2 rounded-lg cursor-pointer border border-brand text-brand"
              >
                Login
              </button>
              <button
                onClick={() => {
                  dispatch(setShowAuth("signup"));
                  setSidebarOpen(false);
                }}
                className="px-8 text-base py-2 rounded-lg cursor-pointer bg-brand text-white"
              >
                Register
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar menu"
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {sidebarOpen ? (
              <path d="M6 18L18 6M6 6l12 12" /> // X icon when open
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" /> // Hamburger icon when closed
            )}
          </svg>
        </button>
      </nav>

      {/* Sidebar overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-10 transition-opacity duration-300 ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white z-20 shadow-lg transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Close button */}
          <button
            className="self-end mb-6 text-brand focus:outline-none focus:ring-2 focus:ring-brand rounded"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Sidebar content */}
          {isAuthenticated ? (
            <>
              <span className="mb-4 font-semibold">
                Welcome, {user?.firstName}
              </span>
              <button
                onClick={() => {
                  dispatch(logoutUser());
                  setSidebarOpen(false);
                }}
                className="text-brand hover:underline text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col lg:hidden gap-4">
              <button
                onClick={() => {
                  dispatch(setShowAuth("signin"));
                  setSidebarOpen(false);
                }}
                className="px-8 text-base py-2 rounded-lg cursor-pointer border border-brand text-brand"
              >
                Login
              </button>
              <button
                onClick={() => {
                  dispatch(setShowAuth("signup"));
                  setSidebarOpen(false);
                }}
                className="px-8 text-base py-2 rounded-lg cursor-pointer bg-brand text-white"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default Navbar;
