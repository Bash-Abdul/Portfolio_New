// import { useState } from 'react'
// import { useParams, useNavigate } from 'react-router'
// import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
// import { Modal } from '../../components/dashboard/Modal'
// import { EmptyState } from '../../components/dashboard/EmptyState'
// import { Plus, ArrowLeft, Trash2, Edit, Loader2, TicketIcon, MoreVertical } from 'lucide-react'
// import { motion } from 'motion/react'
// import {
//   useTickets,
//   useCreateTicket,
//   useUpdateTicket,
//   useDeleteTicket
// } from '../../../hooks/useBoard'

// const columns = [
//   { id: 'todo',        title: 'To Do' },
//   { id: 'in-progress', title: 'In Progress' },
//   { id: 'done',        title: 'Done' },
// ]

// const priorityColors = {
//   low:    'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400',
//   medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
//   high:   'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
// }

// const EMPTY_FORM = {
//   title: '', description: '', notes: '',
//   status: 'todo', priority: 'medium', assignee: ''
// }

// export default function ProjectTickets() {
//   const { projectId } = useParams()
//   const navigate = useNavigate()

//   const [isCreateOpen, setIsCreateOpen]   = useState(false)
//   const [isDetailOpen, setIsDetailOpen]   = useState(false)
//   const [selectedTicket, setSelectedTicket] = useState(null)
//   const [defaultStatus, setDefaultStatus] = useState('todo')
//   const [form, setForm]                   = useState(EMPTY_FORM)
//   const [detailForm, setDetailForm]       = useState(null)
//   const [isEditMode, setIsEditMode] = useState(false)

//   const { data, isLoading, isError }  = useTickets(projectId)
//   const createTicket                  = useCreateTicket(projectId)
//   const updateTicket                  = useUpdateTicket(projectId)
//   const deleteTicket                  = useDeleteTicket(projectId)

//   const tickets = data?.data    ?? []
//   const project = data?.project ?? null

//   function getByStatus(status) {
//     return tickets.filter(t => t.status === status)
//   }

//   function handleOpenCreate(status = 'todo') {
//     setDefaultStatus(status)
//     setForm({ ...EMPTY_FORM, status })
//     setIsCreateOpen(true)
//   }

//   function handleOpenDetail(ticket) {
//     setSelectedTicket(ticket)
//     setIsEditMode(false) // always open in read mode
//     setDetailForm({
//       title:       ticket.title,
//       description: ticket.description ?? '',
//       notes:       ticket.notes ?? '',
//       status:      ticket.status,
//       priority:    ticket.priority,
//       assignee:    ticket.assignee ?? ''
//     })
//     setIsDetailOpen(true)
//   }

//   function handleOpenEdit(e, ticket) {
//     e.stopPropagation()
//     setSelectedTicket(ticket)
//     setIsEditMode(true) // open in edit mode
//     setDetailForm({
//       title:       ticket.title,
//       description: ticket.description ?? '',
//       notes:       ticket.notes ?? '',
//       status:      ticket.status,
//       priority:    ticket.priority,
//       assignee:    ticket.assignee ?? ''
//     })
//     setIsDetailOpen(true)
//   }

//   async function handleCreate() {
//     const payload = {
//       ...form,
//       description: form.description || null,
//       notes:       form.notes || null,
//       assignee:    form.assignee || null
//     }
//     await createTicket.mutateAsync(payload)
//     setIsCreateOpen(false)
//     setForm(EMPTY_FORM)
//   }

//   async function handleDetailSave() {
//     const payload = {
//       ...detailForm,
//       description: detailForm.description || null,
//       notes:       detailForm.notes || null,
//       assignee:    detailForm.assignee || null
//     }
//     await updateTicket.mutateAsync({ ticketId: selectedTicket.id, data: payload })
//     setIsDetailOpen(false)
//     setSelectedTicket(null)
//   }

//   async function handleDelete(ticketId) {
//     if (!confirm('Delete this ticket?')) return
//     await deleteTicket.mutateAsync(ticketId)
//   }

//   const actions = (
//     <div className="flex items-center gap-3">
//       <button
//         onClick={() => navigate('/dashboard/board')}
//         className="px-4 py-3 border border-neutral-300 dark:border-neutral-600 hover:border-black dark:hover:border-white transition-colors flex items-center gap-2 dark:text-white"
//       >
//         <ArrowLeft className="w-4 h-4" />
//         Back
//       </button>
//       <button
//         onClick={() => handleOpenCreate()}
//         className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2"
//       >
//         <Plus className="w-4 h-4" />
//         New Ticket
//       </button>
//     </div>
//   )

//   if (isLoading) {
//     return (
//       <DashboardLayout title="Loading..." actions={actions}>
//         <div className="flex items-center justify-center py-20">
//           <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
//         </div>
//       </DashboardLayout>
//     )
//   }

//   if (isError) {
//     return (
//       <DashboardLayout title="Project Board" actions={actions}>
//         <div className="py-20 text-center text-red-500">Failed to load tickets.</div>
//       </DashboardLayout>
//     )
//   }

//   return (
//     <DashboardLayout title={project?.name ?? 'Project Board'} actions={actions}>
//       <div className="max-w-7xl">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {columns.map(column => {
//             const columnTickets = getByStatus(column.id)
//             return (
//               <div key={column.id} className="flex flex-col">
//                 <div className="bg-neutral-100 dark:bg-neutral-800 px-4 py-3 mb-4">
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-medium dark:text-white">{column.title}</h3>
//                     <span className="text-sm text-neutral-600 dark:text-neutral-400">
//                       {columnTickets.length}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="space-y-3 flex-1">
//                   {columnTickets.length === 0 && (
//                     <div className="text-center py-8 text-sm text-neutral-400">
//                       No tickets
//                     </div>
//                   )}

//                   {columnTickets.map((ticket, index) => (
// // replace the existing card content
// <motion.div
//   key={ticket.id}
//   initial={{ opacity: 0, y: 10 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.3, delay: index * 0.05 }}
//   onClick={() => handleOpenDetail(ticket)}
//   className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-4 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all cursor-pointer group"
// >
//   <div className="flex items-start justify-between mb-2">
//     <h4 className="font-medium dark:text-white group-hover:opacity-80 transition-opacity text-sm">
//       {ticket.title}
//     </h4>
//     <div className="relative opacity-0 group-hover:opacity-100 flex-shrink-0">
//       <button
//         onClick={(e) => {
//           e.stopPropagation()
//           setOpenMenuId(openMenuId === ticket.id ? null : ticket.id)
//         }}
//         className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
//       >
//         <MoreVertical className="w-4 h-4 dark:text-white" />
//       </button>

//       {openMenuId === ticket.id && (
//         <div className="absolute right-0 top-7 z-10 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-lg w-32">
//           <button
//             onClick={(e) => {
//               setOpenMenuId(null)
//               handleOpenEdit(e, ticket)
//             }}
//             className="w-full px-4 py-2 text-sm text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:text-white flex items-center gap-2"
//           >
//             <Edit className="w-3.5 h-3.5" />
//             Edit
//           </button>
//           <button
//             onClick={(e) => {
//               e.stopPropagation()
//               setOpenMenuId(null)
//               handleDelete(ticket.id)
//             }}
//             className="w-full px-4 py-2 text-sm text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 text-red-500 flex items-center gap-2"
//           >
//             <Trash2 className="w-3.5 h-3.5" />
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   </div>

//   {ticket.description && (
//     <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
//       {ticket.description}
//     </p>
//   )}

//   <div className="flex items-center justify-between">
//     <span className={`px-2 py-0.5 text-xs font-medium ${priorityColors[ticket.priority]}`}>
//       {ticket.priority}
//     </span>
//     {ticket.assignee && (
//       <div className="w-6 h-6 bg-neutral-800 dark:bg-white rounded-full flex items-center justify-center text-xs text-white dark:text-black font-medium">
//         {ticket.assignee[0].toUpperCase()}
//       </div>
//     )}
//   </div>
// </motion.div>
//                   ))}

//                   <button
//                     onClick={() => handleOpenCreate(column.id)}
//                     className="w-full border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors py-3 text-sm text-neutral-500 dark:text-neutral-400"
//                   >
//                     + Add ticket
//                   </button>
//                 </div>
//               </div>
//             )
//           })}
//         </div>

//         {/* Create Ticket Modal */}
//         <Modal
//           isOpen={isCreateOpen}
//           onClose={() => setIsCreateOpen(false)}
//           title="Create New Ticket"
//           footer={
//             <>
//               <button
//                 onClick={() => setIsCreateOpen(false)}
//                 className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-white"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCreate}
//                 disabled={createTicket.isPending}
//                 className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50"
//               >
//                 {createTicket.isPending ? 'Creating...' : 'Create Ticket'}
//               </button>
//             </>
//           }
//         >
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-2 dark:text-white">Title</label>
//               <input
//                 type="text"
//                 value={form.title}
//                 onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
//                 className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                 placeholder="Ticket title"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2 dark:text-white">Description</label>
//               <textarea
//                 rows={3}
//                 value={form.description}
//                 onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
//                 className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white resize-none dark:text-white"
//                 placeholder="Short summary shown on the card..."
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2 dark:text-white">Status</label>
//                 <select
//                   value={form.status}
//                   onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
//                   className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                 >
//                   <option value="todo">To Do</option>
//                   <option value="in-progress">In Progress</option>
//                   <option value="done">Done</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2 dark:text-white">Priority</label>
//                 <select
//                   value={form.priority}
//                   onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
//                   className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                 >
//                   <option value="low">Low</option>
//                   <option value="medium">Medium</option>
//                   <option value="high">High</option>
//                 </select>
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2 dark:text-white">Assignee</label>
//               <input
//                 type="text"
//                 value={form.assignee}
//                 onChange={e => setForm(f => ({ ...f, assignee: e.target.value }))}
//                 className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                 placeholder="Assignee name"
//               />
//             </div>
//           </div>
//         </Modal>

//         {/* Ticket Detail Modal */}
//         {detailForm && (
//           <Modal
//             isOpen={isDetailOpen}
//             onClose={() => { setIsDetailOpen(false); setSelectedTicket(null) }}
//             title="Ticket Details"
//             footer={
//               <>
//                 <button
//                   onClick={() => { setIsDetailOpen(false); setSelectedTicket(null) }}
//                   className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-white"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDetailSave}
//                   disabled={updateTicket.isPending}
//                   className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50"
//                 >
//                   {updateTicket.isPending ? 'Saving...' : 'Save Changes'}
//                 </button>
//               </>
//             }
//           >
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2 dark:text-white">Title</label>
//                 <input
//                   type="text"
//                   value={detailForm.title}
//                   onChange={e => setDetailForm(f => ({ ...f, title: e.target.value }))}
//                   className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2 dark:text-white">Description</label>
//                 <textarea
//                   rows={2}
//                   value={detailForm.description}
//                   onChange={e => setDetailForm(f => ({ ...f, description: e.target.value }))}
//                   className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white resize-none dark:text-white"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2 dark:text-white">Status</label>
//                   <select
//                     value={detailForm.status}
//                     onChange={e => setDetailForm(f => ({ ...f, status: e.target.value }))}
//                     className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                   >
//                     <option value="todo">To Do</option>
//                     <option value="in-progress">In Progress</option>
//                     <option value="done">Done</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2 dark:text-white">Priority</label>
//                   <select
//                     value={detailForm.priority}
//                     onChange={e => setDetailForm(f => ({ ...f, priority: e.target.value }))}
//                     className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                   >
//                     <option value="low">Low</option>
//                     <option value="medium">Medium</option>
//                     <option value="high">High</option>
//                   </select>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2 dark:text-white">Assignee</label>
//                 <input
//                   type="text"
//                   value={detailForm.assignee}
//                   onChange={e => setDetailForm(f => ({ ...f, assignee: e.target.value }))}
//                   className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2 dark:text-white">Notes (Markdown)</label>
//                 <textarea
//                   rows={8}
//                   value={detailForm.notes}
//                   onChange={e => setDetailForm(f => ({ ...f, notes: e.target.value }))}
//                   className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white resize-none dark:text-white font-mono text-sm"
//                   placeholder={"# Task Notes\n\n- [ ] Subtask 1\n- [ ] Subtask 2"}
//                 />
//               </div>
//             </div>
//           </Modal>
//         )}
//       </div>
//     </DashboardLayout>
//   )
// }


import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { Modal } from '../../components/dashboard/Modal'
import { Plus, ArrowLeft, MoreVertical, Edit, Trash2, Loader2 } from 'lucide-react'
import { motion } from 'motion/react'
import {
  useTickets,
  useCreateTicket,
  useUpdateTicket,
  useDeleteTicket
} from '../../../hooks/useBoard'

const columns = [
  { id: 'todo',        title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done',        title: 'Done' },
]

const priorityColors = {
  low:    'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400',
  medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  high:   'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
}

const EMPTY_FORM = {
  title: '', description: '', notes: '',
  status: 'todo', priority: 'medium', assignee: ''
}

export default function ProjectTickets() {
  const { projectId } = useParams()
  const navigate = useNavigate()

  const [isCreateOpen, setIsCreateOpen]     = useState(false)
  const [isDetailOpen, setIsDetailOpen]     = useState(false)
  const [isEditMode, setIsEditMode]         = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [openMenuId, setOpenMenuId]         = useState(null)
  const [form, setForm]                     = useState(EMPTY_FORM)
  const [detailForm, setDetailForm]         = useState(null)

  const { data, isLoading, isError } = useTickets(projectId)
  const createTicket = useCreateTicket(projectId)
  const updateTicket = useUpdateTicket(projectId)
  const deleteTicket = useDeleteTicket(projectId)

  const tickets = data?.data    ?? []
  const project = data?.project ?? null

  // close dropdown when clicking outside
  useEffect(() => {
    const close = () => setOpenMenuId(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  function getByStatus(status) {
    return tickets.filter(t => t.status === status)
  }

  function handleOpenCreate(status = 'todo') {
    setForm({ ...EMPTY_FORM, status })
    setIsCreateOpen(true)
  }

  function handleOpenDetail(ticket) {
    setSelectedTicket(ticket)
    setIsEditMode(false)
    setDetailForm({
      // title:       ticket.title,
      description: ticket.description ?? '',
      notes:       ticket.notes ?? '',
      status:      ticket.status,
      priority:    ticket.priority,
      assignee:    ticket.assignee ?? ''
    })
    setIsDetailOpen(true)
  }

  function handleOpenEdit(e, ticket) {
    e.stopPropagation()
    setSelectedTicket(ticket)
    setIsEditMode(true)
    setDetailForm({
      title:       ticket.title,
      description: ticket.description ?? '',
      notes:       ticket.notes ?? '',
      status:      ticket.status,
      priority:    ticket.priority,
      assignee:    ticket.assignee ?? ''
    })
    setIsDetailOpen(true)
  }

  function handleDetailClose() {
    setIsDetailOpen(false)
    setSelectedTicket(null)
    setDetailForm(null)
    setIsEditMode(false)
  }

  async function handleCreate() {
    const payload = {
      ...form,
      description: form.description || null,
      notes:       form.notes || null,
      assignee:    form.assignee || null
    }
    await createTicket.mutateAsync(payload)
    setIsCreateOpen(false)
    setForm(EMPTY_FORM)
  }

  async function handleDetailSave() {
    const payload = {
      ...detailForm,
      description: detailForm.description || null,
      notes:       detailForm.notes || null,
      assignee:    detailForm.assignee || null
    }
    await updateTicket.mutateAsync({ ticketId: selectedTicket.id, data: payload })
    handleDetailClose()
  }

  async function handleDelete(e, ticketId) {
    e.stopPropagation()
    if (!confirm('Delete this ticket?')) return
    await deleteTicket.mutateAsync(ticketId)
  }

  const actions = (
    <div className="flex items-center gap-3">
      <button
        onClick={() => navigate('/dashboard/board')}
        className="px-4 py-3 border border-neutral-300 dark:border-neutral-600 hover:border-black dark:hover:border-white transition-colors flex items-center gap-2 dark:text-white"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      <button
        onClick={() => handleOpenCreate()}
        className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        New Ticket
      </button>
    </div>
  )

  if (isLoading) {
    return (
      <DashboardLayout title="Loading..." actions={actions}>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
        </div>
      </DashboardLayout>
    )
  }

  if (isError) {
    return (
      <DashboardLayout title="Project Board" actions={actions}>
        <div className="py-20 text-center text-red-500">Failed to load tickets.</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title={project?.name ?? 'Project Board'} actions={actions}>
      <div className="max-w-7xl">

        {/* Kanban columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map(column => {
            const columnTickets = getByStatus(column.id)
            return (
              <div key={column.id} className="flex flex-col">

                {/* Column header */}
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
                  {columnTickets.length === 0 && (
                    <div className="text-center py-8 text-sm text-neutral-400">
                      No tickets
                    </div>
                  )}

                  {columnTickets.map((ticket, index) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => handleOpenDetail(ticket)}
                      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-4 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium dark:text-white group-hover:opacity-80 transition-opacity text-sm">
                          {ticket.title}
                        </h4>

                        {/* Three dot menu */}
                        <div className="relative flex-shrink-0 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              setOpenMenuId(openMenuId === ticket.id ? null : ticket.id)
                            }}
                            className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 dark:text-white" />
                          </button>

                          {openMenuId === ticket.id && (
                            <div className="absolute right-0 top-7 z-10 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-lg w-32">
                              <button
                                onClick={e => {
                                  setOpenMenuId(null)
                                  handleOpenEdit(e, ticket)
                                }}
                                className="w-full px-4 py-2 text-sm text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:text-white flex items-center gap-2"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                Edit
                              </button>
                              <button
                                onClick={e => {
                                  setOpenMenuId(null)
                                  handleDelete(e, ticket.id)
                                }}
                                className="w-full px-4 py-2 text-sm text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 text-red-500 flex items-center gap-2"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {ticket.description && (
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                          {ticket.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 text-xs font-medium ${priorityColors[ticket.priority]}`}>
                          {ticket.priority}
                        </span>
                        {ticket.assignee && (
                          <div className="w-6 h-6 bg-neutral-800 dark:bg-white rounded-full flex items-center justify-center text-xs text-white dark:text-black font-medium">
                            {ticket.assignee[0].toUpperCase()}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  <button
                    onClick={() => handleOpenCreate(column.id)}
                    className="w-full border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors py-3 text-sm text-neutral-500 dark:text-neutral-400"
                  >
                    + Add ticket
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Create Ticket Modal */}
        <Modal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="Create New Ticket"
          footer={
            <>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={createTicket.isPending}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50"
              >
                {createTicket.isPending ? 'Creating...' : 'Create Ticket'}
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                placeholder="Ticket title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white resize-none dark:text-white"
                placeholder="Short summary shown on the card..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Priority</label>
                <select
                  value={form.priority}
                  onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Assignee</label>
              <input
                type="text"
                value={form.assignee}
                onChange={e => setForm(f => ({ ...f, assignee: e.target.value }))}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                placeholder="Assignee name"
              />
            </div>
          </div>
        </Modal>

        {/* Ticket Detail / Edit Modal */}
        {detailForm && (
          <Modal
            isOpen={isDetailOpen}
            onClose={handleDetailClose}
            title={isEditMode ? 'Edit Ticket' : selectedTicket?.title}
            footer={
              <>
                <button
                  onClick={handleDetailClose}
                  className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDetailSave}
                  disabled={updateTicket.isPending}
                  className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50"
                >
                  {updateTicket.isPending ? 'Saving...' : 'Save'}
                </button>
              </>
            }
          >
            <div className="space-y-4">

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Title</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={detailForm.title}
                    onChange={e => setDetailForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                  />
                ) : (
                  <p className="dark:text-white font-medium">{detailForm.title}</p>
                )}
              </div>

              {/* Description */}
              {(isEditMode || detailForm.description) && (
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Description</label>
                  {isEditMode ? (
                    <textarea
                      rows={2}
                      value={detailForm.description}
                      onChange={e => setDetailForm(f => ({ ...f, description: e.target.value }))}
                      className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white resize-none dark:text-white"
                    />
                  ) : (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{detailForm.description}</p>
                  )}
                </div>
              )}

              {/* Status + Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Status</label>
                  {isEditMode ? (
                    <select
                      value={detailForm.status}
                      onChange={e => setDetailForm(f => ({ ...f, status: e.target.value }))}
                      className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  ) : (
                    <span className="text-sm text-neutral-600 dark:text-neutral-400 capitalize">
                      {detailForm.status.replace('-', ' ')}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Priority</label>
                  {isEditMode ? (
                    <select
                      value={detailForm.priority}
                      onChange={e => setDetailForm(f => ({ ...f, priority: e.target.value }))}
                      className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  ) : (
                    <span className={`px-2.5 py-1 text-xs font-medium ${priorityColors[detailForm.priority]}`}>
                      {detailForm.priority}
                    </span>
                  )}
                </div>
              </div>

              {/* Assignee */}
              {(isEditMode || detailForm.assignee) && (
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Assignee</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={detailForm.assignee}
                      onChange={e => setDetailForm(f => ({ ...f, assignee: e.target.value }))}
                      className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-neutral-800 dark:bg-white rounded-full flex items-center justify-center text-xs text-white dark:text-black font-medium">
                        {detailForm.assignee[0].toUpperCase()}
                      </div>
                      <span className="text-sm dark:text-white">{detailForm.assignee}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Notes — always editable */}
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">
                  Notes
                  {!isEditMode && (
                    <span className="text-xs text-neutral-400 font-normal ml-1">(markdown)</span>
                  )}
                </label>
                <textarea
                  rows={8}
                  value={detailForm.notes}
                  onChange={e => setDetailForm(f => ({ ...f, notes: e.target.value }))}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white resize-none dark:text-white font-mono text-sm"
                  placeholder={"# Task Notes\n\n- [ ] Subtask 1\n- [ ] Subtask 2"}
                />
              </div>

            </div>
          </Modal>
        )}

      </div>
    </DashboardLayout>
  )
}