import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { Modal } from "../../components/dashboard/Modal";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { Plus, ArrowLeft, MoreVertical } from "lucide-react";
import { motion } from "motion/react";

const mockTickets = [
  {
    id: "1",
    title: "Design new homepage",
    description: "Create wireframes and mockups for the new homepage layout",
    status: "in-progress",
    priority: "high",
    assignee: "Bashir",
  },
  {
    id: "2",
    title: "Set up authentication",
    description: "Implement user authentication with OAuth",
    status: "todo",
    priority: "high",
  },
  {
    id: "3",
    title: "Update documentation",
    description: "Add API documentation for new endpoints",
    status: "todo",
    priority: "low",
  },
  {
    id: "4",
    title: "Fix mobile responsive issues",
    description: "Resolve layout issues on mobile devices",
    status: "done",
    priority: "medium",
  },
];

const columns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const priorityColors = {
  low: "bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export default function ProjectTickets() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(mockTickets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isTicketDetailOpen, setIsTicketDetailOpen] = useState(false);

  const getTicketsByStatus = (status) => {
    return tickets.filter((ticket) => ticket.status === status);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsTicketDetailOpen(true);
  };

  const actions = (
    <div className="flex items-center gap-3">
      <button
        onClick={() => navigate("/dashboard/board")}
        className="px-4 py-3 border border-neutral-300 dark:border-neutral-600 hover:border-black dark:hover:border-white transition-colors flex items-center gap-2 dark:text-white"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        New Ticket
      </button>
    </div>
  );

  return (
    <DashboardLayout title="Portfolio Redesign" actions={actions}>
      <div className="max-w-7xl">
        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map((column) => {
            const columnTickets = getTicketsByStatus(column.id);
            return (
              <div key={column.id} className="flex flex-col">
                {/* Column Header */}
                <div className="bg-neutral-100 dark:bg-neutral-800 px-4 py-3 mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium dark:text-white">{column.title}</h3>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {columnTickets.length}
                    </span>
                  </div>
                </div>

                {/* Tickets */}
                <div className="space-y-3 flex-1">
                  {columnTickets.map((ticket, index) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => handleTicketClick(ticket)}
                      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-4 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium dark:text-white group-hover:opacity-80 transition-opacity">
                          {ticket.title}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <MoreVertical className="w-4 h-4 dark:text-white" />
                        </button>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                        {ticket.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-0.5 text-xs font-medium ${priorityColors[ticket.priority]}`}
                        >
                          {ticket.priority}
                        </span>
                        {ticket.assignee && (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-neutral-800 dark:bg-white rounded-full flex items-center justify-center text-xs text-white dark:text-black font-medium">
                              {ticket.assignee[0]}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Add ticket to column */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors py-3 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300"
                  >
                    + Add ticket
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Ticket Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Ticket"
          footer={
            <>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-white"
              >
                Cancel
              </button>
              <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
                Create Ticket
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Title</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                placeholder="Ticket title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Description</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white resize-none dark:text-white"
                placeholder="Add a description..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Status</label>
                <select className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white">
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Priority</label>
                <select className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Assignee (Optional)</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                placeholder="Assignee name"
              />
            </div>
          </div>
        </Modal>

        {/* Ticket Detail Modal */}
        <Modal
          isOpen={isTicketDetailOpen}
          onClose={() => setIsTicketDetailOpen(false)}
          title={selectedTicket?.title || "Ticket Details"}
          footer={
            <>
              <button
                onClick={() => setIsTicketDetailOpen(false)}
                className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-white"
              >
                Close
              </button>
              <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
                Save Changes
              </button>
            </>
          }
        >
          {selectedTicket && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Description</label>
                <p className="text-neutral-600 dark:text-neutral-400">{selectedTicket.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Status</label>
                  <StatusBadge variant="pending">{selectedTicket.status}</StatusBadge>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Priority</label>
                  <span className={`px-2.5 py-0.5 text-xs font-medium ${priorityColors[selectedTicket.priority]}`}>
                    {selectedTicket.priority}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Notes (Markdown)</label>
                <textarea
                  rows={8}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white resize-none dark:text-white font-mono text-sm"
                  placeholder="# Task Notes&#10;&#10;Use markdown to document your workflow...&#10;&#10;- [ ] Subtask 1&#10;- [ ] Subtask 2"
                />
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}
