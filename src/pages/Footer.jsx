// src/components/Footer.jsx

import { Link } from "react-router-dom";

const STORE_NAME = "Alam Kirana Store";

const STORE_TAGLINE = "Your daily groceries, made easy.";
const STORE_ADDRESS = "Alam Store, Barinagar, Telco, Jamshedpur - 831004";
const DELIVERY_AREA = "Barinagar, Telco";
const STORE_PHONE = "+91 9304734936";
const STORE_EMAIL = "alamkiranastoree@gmail.com";
const STORE_HOURS = "Daily: 8:00 AM – 10:00 PM";

export default function Footer() {
  return (
    <footer className="bg-[#0b0f0c] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-500 text-lg font-bold text-black">
                A
              </span>

              <span className="text-xl font-bold tracking-tight">
                Alam <span className="text-lime-400">Kirana</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              {STORE_TAGLINE}
            </p>

            <p className="mt-5 text-xs font-medium uppercase tracking-wider text-lime-400">
              Fresh essentials. Friendly service.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider">
              Quick links
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                <Link className="transition hover:text-lime-400" to="/">
                  Home
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-lime-400" to="/login">
                  Login
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-lime-400" to="/signup">
                  Create account
                </Link>
              </li>

              <li>
                <Link
                  className="transition hover:text-lime-400"
                  to="/profile/orders"
                >
                  My orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider">
              Store details
            </h2>

            <div className="mt-4 space-y-4 text-sm text-gray-400">
              <div>
                <p className="mb-1 font-medium text-white">Address</p>
                <p className="leading-6">{STORE_ADDRESS}</p>
              </div>

              <div>
                <p className="mb-1 font-medium text-white">Delivery area</p>
                <p>{DELIVERY_AREA}</p>
              </div>

              <div>
                <p className="mb-1 font-medium text-white">Phone</p>
                <a
                  className="transition hover:text-lime-400"
                  href={`tel:${STORE_PHONE.replace(/\s/g, "")}`}
                >
                  {STORE_PHONE}
                </a>
              </div>

              <div>
                <p className="mb-1 font-medium text-white">Email</p>
                <a
                  className="break-all transition hover:text-lime-400"
                  href={`mailto:${STORE_EMAIL}`}
                >
                  {STORE_EMAIL}
                </a>
              </div>

              <div>
                <p className="mb-1 font-medium text-white">Opening hours</p>
                <p>{STORE_HOURS}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {STORE_NAME}. All rights reserved.
          </p>

          <p>Made with care for your everyday shopping.</p>
        </div>
      </div>
    </footer>
  );
}
