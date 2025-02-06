import DashboardHumanResourceLayout from "@/Layouts/DashboardHumanResourceLayout";
import DashboardFinanceLayout from "@/Layouts/DashboardFinanceLayout";
import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import DashboardInventoryLayot from "@/Layouts/DashboardInventoryLayout";
import Edit from "./Edit";

const getLayout = (role) => {
    switch (role) {
        case "hr":
            return DashboardHumanResourceLayout;
        case "fnc":
            return DashboardFinanceLayout;
        case 'wrhs':
            return DashboardInventoryLayot;
        default:
            return DashboardAdminLayout;
    }
};

const ProfilePage = ({ auth, mustVerifyEmail, status, title }) => {
    const Layout = getLayout(auth.user.role);

    return (
        <Layout auth={auth}>
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b">
                <h1 className="text-xl font-bold">{title}</h1>
            </div>
            <Edit mustVerifyEmail={mustVerifyEmail} status={status} />
        </Layout>
    );
};

export default ProfilePage;
