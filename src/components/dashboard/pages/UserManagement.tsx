import { useState, useMemo } from 'react';
import { useDashboard } from '../DashboardContext';
import { User, Role, UserStatus } from '../../../types/dashboard';
import { 
  Search, ArrowUpDown, ChevronLeft, ChevronRight, Download, Trash2, 
  ShieldAlert, Plus, Edit2, Filter, CheckSquare, Square, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserManagement() {
  const { 
    users, addUser, updateUser, deleteUser, bulkDeleteUsers, bulkUpdateUsersRole, 
    showToast, openModal 
  } = useDashboard();

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Sorting State
  const [sortField, setSortField] = useState<keyof User>('name');
  const [sortAsc, setSortAsc] = useState(true);

  // Pagination State
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Add User Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<Role>('User');
  const [newStatus, setNewStatus] = useState<UserStatus>('Active');

  // Filtered & Sorted list
  const processedUsers = useMemo(() => {
    let result = [...users];

    // 1. Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(u => 
        u.name.toLowerCase().includes(q) || 
        u.email.toLowerCase().includes(q)
      );
    }

    // 2. Role Filter
    if (roleFilter !== 'All') {
      result = result.filter(u => u.role === roleFilter);
    }

    // 3. Status Filter
    if (statusFilter !== 'All') {
      result = result.filter(u => u.status === statusFilter);
    }

    // 4. Sort
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return 0;
    });

    return result;
  }, [users, search, roleFilter, statusFilter, sortField, sortAsc]);

  // Paginated chunk
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return processedUsers.slice(start, start + rowsPerPage);
  }, [processedUsers, page]);

  const totalPages = Math.max(1, Math.ceil(processedUsers.length / rowsPerPage));

  // Toggle Single Row Selection
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Toggle All Selection
  const toggleSelectAll = () => {
    const pageIds = paginatedUsers.map(u => u.id);
    const allSelectedOnPage = pageIds.every(id => selectedIds.includes(id));
    
    if (allSelectedOnPage) {
      setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
    } else {
      setSelectedIds(prev => [...new Set([...prev, ...pageIds])]);
    }
  };

  // Sort toggle handler
  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Export handlers
  const handleExportCSV = () => {
    showToast('info', 'Export Initiated', 'Preparing CSV file of the active user directory...');
    setTimeout(() => {
      showToast('success', 'Export Completed', 'user_directory.csv downloaded successfully.');
    }, 1200);
  };

  // Delete Action confirmation modal
  const confirmDelete = (user: User) => {
    openModal(
      'delete',
      'Remove Account Credentials',
      `Are you absolute certain you want to remove the admin privileges for ${user.name}? This action cannot be reversed.`,
      () => {
        deleteUser(user.id);
        setSelectedIds(prev => prev.filter(x => x !== user.id));
      }
    );
  };

  // Bulk Delete Action
  const confirmBulkDelete = () => {
    openModal(
      'delete',
      'Confirm Bulk Removal',
      `Are you sure you want to delete the ${selectedIds.length} selected users? This will wipe their credentials.`,
      () => {
        bulkDeleteUsers(selectedIds);
        setSelectedIds([]);
      }
    );
  };

  // Bulk Update Role Action
  const handleBulkRoleUpdate = (role: Role) => {
    bulkUpdateUsersRole(selectedIds, role);
    setSelectedIds([]);
  };

  // Add user submission
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) {
      showToast('error', 'Validation Error', 'Name and Email are required properties.');
      return;
    }
    addUser({
      name: newName,
      email: newEmail,
      role: newRole,
      status: newStatus,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000)}?w=80&fit=crop&q=80`
    });
    // Reset Form
    setNewName('');
    setNewEmail('');
    setNewRole('User');
    setNewStatus('Active');
    setShowAddForm(false);
  };

  // Update user submission
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    updateUser(editingUser.id, {
      name: editingUser.name,
      email: editingUser.email,
      role: editingUser.role,
      status: editingUser.status
    });
    setEditingUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">User Management</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Browse directory records, change access roles, audit log credentials, or terminate users.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => {
              setEditingUser(null);
              setShowAddForm(!showAddForm);
            }}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-primary/10 active:scale-95"
          >
            {showAddForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{showAddForm ? 'Close Editor' : 'Add User Profile'}</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Directory</span>
          </button>
        </div>
      </div>

      {/* Slide-out Editors */}
      <AnimatePresence mode="wait">
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddSubmit}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden"
          >
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Full Name</label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. Liam Neeson"
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Email Address</label>
              <input
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="liam@airzoneltd.com"
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">System Role</label>
              <select
                value={newRole}
                onChange={e => setNewRole(e.target.value as Role)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-700 dark:text-slate-300"
              >
                <option value="User">Standard User</option>
                <option value="Manager">Manager</option>
                <option value="Administrator">Administrator</option>
                <option value="Billing">Billing Operator</option>
                <option value="Support">Support Desk</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2.5 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save New User</span>
              </button>
            </div>
          </motion.form>
        )}

        {editingUser && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleEditSubmit}
            className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden"
          >
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">Editing Account</label>
              <input
                type="text"
                value={editingUser.name}
                onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-750 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Email Address</label>
              <input
                type="email"
                value={editingUser.email}
                onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-750 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">Access Group</label>
              <select
                value={editingUser.role}
                onChange={e => setEditingUser({ ...editingUser, role: e.target.value as Role })}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-750 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-700 dark:text-slate-300"
              >
                <option value="User">Standard User</option>
                <option value="Manager">Manager</option>
                <option value="Administrator">Administrator</option>
                <option value="Billing">Billing Operator</option>
                <option value="Support">Support Desk</option>
              </select>
            </div>
            <div className="flex gap-2 items-end">
              <button
                type="submit"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-sm transition-colors"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-3 py-2.5 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Main Content Area containing filters and tables */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Filters Top Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          
          {/* Left search */}
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search by name, email..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-3.5 text-xs font-bold text-slate-400 hover:text-slate-650"
              >
                Clear
              </button>
            )}
          </div>

          {/* Right filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[10px] uppercase font-bold text-slate-450 tracking-wider">Filters:</span>
            </div>

            {/* Role dropdown */}
            <select
              value={roleFilter}
              onChange={e => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="All">All Roles</option>
              <option value="Administrator">Administrators</option>
              <option value="Manager">Managers</option>
              <option value="User">Users</option>
              <option value="Billing">Billing Operators</option>
              <option value="Support">Support Desk</option>
            </select>

            {/* Status dropdown */}
            <select
              value={statusFilter}
              onChange={e => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Selected Rows Bulk Actions bar */}
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 py-3 bg-primary/5 dark:bg-primary/10 border-b border-primary/10 flex flex-wrap items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-2 font-bold text-primary">
              <CheckSquare className="w-4 h-4" />
              <span>{selectedIds.length} users selected for bulk operations</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={confirmBulkDelete}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-650 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Selected</span>
              </button>
              
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Set Role:</span>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleBulkRoleUpdate(e.target.value as Role);
                      e.target.value = '';
                    }
                  }}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none"
                >
                  <option value="">Choose...</option>
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Administrator">Admin</option>
                  <option value="Billing">Billing</option>
                  <option value="Support">Support</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* User Data Table */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800/80 text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="w-12 px-6 py-4">
                  <button onClick={toggleSelectAll} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                    {paginatedUsers.length > 0 && paginatedUsers.every(u => selectedIds.includes(u.id)) ? (
                      <CheckSquare className="w-4 h-4 text-primary" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-slate-600 dark:hover:text-white" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">
                    <span>User Details</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-slate-600 dark:hover:text-white" onClick={() => handleSort('email')}>
                  <div className="flex items-center gap-1">
                    <span>Email</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-slate-600 dark:hover:text-white" onClick={() => handleSort('role')}>
                  <div className="flex items-center gap-1">
                    <span>Role Group</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-slate-600 dark:hover:text-white" onClick={() => handleSort('status')}>
                  <div className="flex items-center gap-1">
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-slate-600 dark:hover:text-white" onClick={() => handleSort('createdDate')}>
                  <div className="flex items-center gap-1">
                    <span>Created Date</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs text-slate-700 dark:text-slate-350">
              <AnimatePresence mode="popLayout">
                {paginatedUsers.map((user) => {
                  const isSelected = selectedIds.includes(user.id);
                  return (
                    <motion.tr
                      key={user.id}
                      layoutId={`user-row-${user.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, backgroundColor: isSelected ? 'rgba(37, 99, 235, 0.02)' : 'transparent' }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-850/40 transition-colors"
                    >
                      {/* Selection Box */}
                      <td className="px-6 py-4">
                        <button onClick={() => toggleSelect(user.id)} className="text-slate-400 hover:text-slate-650 transition-colors">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-primary" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* User Avatar + Name */}
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900 dark:text-white">
                        <div className="flex items-center gap-3">
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 object-cover" 
                          />
                          <div>
                            <div className="font-bold text-sm leading-snug">{user.name}</div>
                            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-0.5">ID: #{user.id}</div>
                          </div>
                        </div>
                      </td>

                      {/* User Email */}
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>

                      {/* User Role */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 font-semibold">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            user.role === 'Administrator' ? 'bg-primary' : 
                            user.role === 'Manager' ? 'bg-primary-light' :
                            user.role === 'Support' ? 'bg-emerald-500' : 'bg-slate-450'
                          }`} />
                          <span>{user.role}</span>
                        </span>
                      </td>

                      {/* User Status Badge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' :
                          user.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                          user.status === 'Suspended' ? 'bg-red-500/10 text-red-500' :
                          'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}>
                          {user.status}
                        </span>
                      </td>

                      {/* Created Date */}
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-400 dark:text-slate-500">{user.createdDate}</td>

                      {/* User actions */}
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setNewName('');
                              setNewEmail('');
                              setShowAddForm(false);
                              setEditingUser(user);
                            }}
                            className="p-1 text-slate-400 hover:text-primary transition-colors hover:bg-slate-105 dark:hover:bg-slate-800 rounded"
                            title="Edit User Settings"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => confirmDelete(user)}
                            className="p-1 text-slate-400 hover:text-red-650 transition-colors hover:bg-slate-105 dark:hover:bg-slate-800 rounded"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}

                {processedUsers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400 dark:text-slate-550">
                      <div className="flex flex-col items-center gap-2">
                        <ShieldAlert className="w-8 h-8 opacity-60 text-slate-350" />
                        <span className="font-bold">No Directory Records Found</span>
                        <span className="text-xs">Adjust your filtering settings or change your search query parameters.</span>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-slate-400">
          <div>
            Showing <span className="text-slate-800 dark:text-slate-200">
              {processedUsers.length === 0 ? 0 : (page - 1) * rowsPerPage + 1}
            </span> to <span className="text-slate-800 dark:text-slate-200">
              {Math.min(page * rowsPerPage, processedUsers.length)}
            </span> of <span className="text-slate-800 dark:text-slate-200">{processedUsers.length}</span> entries
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => setPage(prev => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="p-2 border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
              className="p-2 border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
