import { prisma } from "@/lib/prisma";
import { ApplicationsTable } from "./applications-table";

async function getApplications() {
    const applications = await prisma.user.findMany({
        where: {
            applicationStatus: { in: ["pending", "rejected"] },
        },
        orderBy: [
            { applicationStatus: "asc" }, // pending first
            { applicationDate: "desc" },
        ],
        select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            applicationStatus: true,
            applicationDate: true,
            applicationData: true,
            referralCode: true,
        },
    });

    return applications;
}

export default async function ApplicationsPage() {
    const applications = await getApplications();

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
                <p className="text-gray-500 mt-1">Review and manage affiliate applications</p>
            </div>

            <ApplicationsTable applications={applications} />
        </div>
    );
}
