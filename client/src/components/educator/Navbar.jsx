import React from "react";
import { assets, dummyEducatorData } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
// import Logger from "../Logger";
const Navbar = () => {
	const educatorData = dummyEducatorData;
	const { user } = useUser();
	return (
		<div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
		 <Link to="/" className="flex items-center justify-center">
        <img src={assets.Edu} alt=" logo" className="w-10 lg:w-14 rounded-full" />
        <h1 className="font-semibold">Edu-Saathi</h1>
      </Link>

			<div className="flex items-center gap-5 text-gray-500 relative">
				{/* <div className="hidden md:block">
					<Logger />
				</div> */}
				<p>Hi! {user ? user.fullName : "Developers"} </p>
				{user ? (
					<UserButton />
				) : (
					<img className="max-w-8" src={assets.profile_img} alt="profile_img" />
				)}
			</div>
		</div>
	);
};

export default Navbar;
