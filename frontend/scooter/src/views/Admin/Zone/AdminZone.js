import withAuth from "../../../util/withAuth";

import "./style.css";
import logo from "../../../logo.png";

function AdminZone() {

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-3/4 h-3/4 p-10 bg-violet-100">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-600 mb-8 font-sans">ADMIN</h1>
                <div className="flex flex-col justify-center gap-5">
                    <a className="hover:bg-sky-700 text-xl text-center p-5 bg-slate-400 text-white rounded" href="/admin/user">Manage Users</a>
                    <a className="hover:bg-sky-700 text-xl text-center p-5 bg-slate-400 text-white rounded" href="/admin/bike">Manage Bikes</a>
                    <a className="hover:bg-sky-700 text-xl text-center p-5 bg-slate-400 text-white rounded" href="/admin/zone">Manage Zones</a>
                </div>
            </div>
        </div>
    );
}

export default AdminZone;