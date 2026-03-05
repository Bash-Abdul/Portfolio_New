import { useState } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { Tabs } from "../../components/dashboard/Tabs";
import { Modal } from "../../components/dashboard/Modal";
import { EmptyState } from "../../components/dashboard/EmptyState";
import { Plus, Edit, Trash2, ExternalLink, Briefcase, Calendar, Building2 } from "lucide-react";
import { motion } from "motion/react";

// type JobStatus = "applied" | "interview" | "offer" | "rejected";

// type JobApplication = {
//   id: string;
//   company: string;
//   position: string;
//   location: string;
//   jobUrl: string;
//   dateApplied: string;
//   status: JobStatus;
//   salary: string;
//   notes: string;
//   nextFollowUp?: string;
// };

const mockApplications = [
  {
    id: "1",
    company: "Vercel",
    position: "Senior Frontend Engineer",
    location: "Remote",
    jobUrl: "https://vercel.com/careers",
    dateApplied: "2024-03-01",
    status: "applied",
    salary: "$150k - $200k",
    notes: "Applied through LinkedIn. Looking for React experts.",
    nextFollowUp: "2024-03-08",
  },
  {
    id: "2",
    company: "Stripe",
    position: "Full Stack Developer",
    location: "San Francisco, CA",
    jobUrl: "https://stripe.com/jobs",
    dateApplied: "2024-02-28",
    status: "applied",
    salary: "$160k - $220k",
    notes: "Referral from John. Focus on payment systems.",
  },
  {
    id: "3",
    company: "Shopify",
    position: "Frontend Developer",
    location: "Remote",
    jobUrl: "https://shopify.com/careers",
    dateApplied: "2024-02-25",
    status: "applied",
    salary: "$140k - $180k",
    notes: "E-commerce platform experience preferred.",
  },
];

const statusConfig = {
  applied: { variant: "pending", label: "Applied" },
  interview: { variant: "draft", label: "Interview" },
  offer: { variant: "published", label: "Offer" },
  rejected: { variant: "rejected", label: "Rejected" },
};

export default function DashboardJobs() {
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applications] = useState(mockApplications);

  const filteredApplications = applications.filter((app) => {
    if (activeTab === "All") return true;
    return app.status === activeTab.toLowerCase();
  });

  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "applied").length,
    interview: applications.filter((a) => a.status === "interview").length,
    offer: applications.filter((a) => a.status === "offer").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  const actions = (
    <button
      onClick={() => setIsModalOpen(true)}
      className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2"
    >
      <Plus className="w-4 h-4" />
      Add Application
    </button>
  );

  return (
    <DashboardLayout title="Job Applications" actions={actions}>
      <div className="max-w-7xl space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Total</p>
            <p className="text-2xl font-bold dark:text-white">{stats.total}</p>
          </div>
          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Applied</p>
            <p className="text-2xl font-bold dark:text-white">{stats.applied}</p>
          </div>
          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Interview</p>
            <p className="text-2xl font-bold dark:text-white">{stats.interview}</p>
          </div>
          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Offers</p>
            <p className="text-2xl font-bold dark:text-white">{stats.offer}</p>
          </div>
          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Rejected</p>
            <p className="text-2xl font-bold dark:text-white">{stats.rejected}</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={["All", "Applied", "Interview", "Offer", "Rejected"]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            message="No applications yet. Start tracking your job search."
            action={{
              label: "Add Application",
              onClick: () => setIsModalOpen(true),
            }}
          />
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="p-3 bg-neutral-100 dark:bg-neutral-700 flex-shrink-0">
                        <Building2 className="w-6 h-6 dark:text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold dark:text-white">{app.position}</h3>
                          <StatusBadge variant={statusConfig[app.status].variant}>
                            {statusConfig[app.status].label}
                          </StatusBadge>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                          {app.company} · {app.location}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Applied: {app.dateApplied}
                          </div>
                          {app.nextFollowUp && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Follow-up: {app.nextFollowUp}
                            </div>
                          )}
                          <div className="font-medium dark:text-white">{app.salary}</div>
                        </div>
                      </div>
                    </div>

                    {app.notes && (
                      <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{app.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={app.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      title="View Job Posting"
                    >
                      <ExternalLink className="w-5 h-5 dark:text-white" />
                    </a>
                    <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                      <Edit className="w-5 h-5 dark:text-white" />
                    </button>
                    <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add Application Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Job Application"
          footer={
            <>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-white"
              >
                Cancel
              </button>
              <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
                Add Application
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Company</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                  placeholder="Vercel"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Position</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                  placeholder="Frontend Engineer"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Location</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                  placeholder="Remote"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Salary Range</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                  placeholder="$150k - $200k"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Job URL</label>
              <input
                type="url"
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                placeholder="https://company.com/careers/job-id"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Date Applied</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Status</label>
                <select className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white">
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Next Follow-up Date (Optional)</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Notes</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white resize-none dark:text-white"
                placeholder="Add any notes about the application, contacts, or requirements..."
              />
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
