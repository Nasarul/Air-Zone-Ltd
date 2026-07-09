import { useState } from 'react';
import { useDashboard } from '../DashboardContext';
import { Camera, Save, Globe, Twitter, Github, Linkedin, Briefcase, MapPin, Mail, Phone } from 'lucide-react';

export default function ProfileView() {
  const { currentUser, updateProfile, showToast } = useDashboard();

  if (!currentUser) return null;

  // Editable Profile States
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [role, setRole] = useState(currentUser.role);
  const [address, setAddress] = useState(currentUser.address);
  const [bio, setBio] = useState(currentUser.bio);
  
  // Social link mock state
  const [twitter, setTwitter] = useState('https://twitter.com/airzone');
  const [github, setGithub] = useState('https://github.com/airzone');
  const [linkedin, setLinkedin] = useState('https://linkedin.com/company/airzone');

  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [cover, setCover] = useState(currentUser.cover);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      showToast('error', 'Fields Required', 'Full Name and Email address must not be blank.');
      return;
    }

    updateProfile({ name, email, phone, role, address, bio, avatar, cover });
    showToast('success', 'Profile Updated', 'Profile information has been stored successfully.');
  };

  const triggerUploadAvatar = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          showToast('error', 'File Too Large', 'Please select an image under 2MB.');
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          const resultStr = event.target?.result as string;
          setAvatar(resultStr);
          updateProfile({ avatar: resultStr });
          showToast('success', 'Avatar Uploaded', 'Successfully modified user avatar thumbnail.');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const triggerUploadCover = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 3 * 1024 * 1024) {
          showToast('error', 'File Too Large', 'Please select an image under 3MB.');
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          const resultStr = event.target?.result as string;
          setCover(resultStr);
          updateProfile({ cover: resultStr });
          showToast('success', 'Cover Photo Uploaded', 'Successfully changed profile header layout background.');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Agent Profile</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize your bio card, contact parameters, and social links display.
        </p>
      </div>

      {/* Large Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl overflow-hidden shadow-sm">
        {/* Cover Photo Banner */}
        <div className="h-44 md:h-56 relative bg-slate-250">
          <img src={cover} alt="Cover Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/10" />
          <button
            onClick={triggerUploadCover}
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-xl backdrop-blur-md transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <Camera className="w-4 h-4" />
            <span>Change Cover</span>
          </button>
        </div>

        {/* Profile Info Overlay Row */}
        <div className="px-6 pb-6 relative flex flex-col md:flex-row gap-6 md:items-end -mt-16 md:-mt-10">
          {/* Avatar Thumbnail */}
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden shadow-md relative group flex-shrink-0 bg-slate-100 dark:bg-slate-800">
            <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
            <button
              onClick={triggerUploadAvatar}
              className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="w-5 h-5" />
              <span className="text-[10px] font-bold">Edit Picture</span>
            </button>
          </div>

          <div className="flex-grow pt-4 md:pt-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white leading-tight">{name}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1">{role}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{address || 'Dhaka, Bangladesh'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <span>Air Zone Enterprise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editable Fields Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Bio and Contact summary */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl shadow-sm space-y-6 self-start">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">About Agent</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
              "{bio || 'No bio provided yet.'}"
            </p>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 space-y-3.5 text-xs text-slate-650 dark:text-slate-350">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{phone || '+880 1700-000000'}</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-slate-400" />
              <span>www.airzoneltd.com</span>
            </div>
          </div>
        </div>

        {/* Right Forms Fields settings */}
        <form onSubmit={handleSave} className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl shadow-sm space-y-6">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">Edit Details</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Full Display Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-4.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Email Address (Secured)</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-4.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Contact Number</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-4.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Role Title</label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-4.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Physical Address</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-4.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Personal Biography Summary</label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-4.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>
          </div>

          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pt-4 pb-3">Social Profiles</h4>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Twitter className="w-4 h-4 text-primary-light flex-shrink-0" />
              <input
                type="text"
                value={twitter}
                onChange={e => setTwitter(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-4.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex items-center gap-3">
              <Github className="w-4 h-4 text-slate-800 dark:text-slate-200 flex-shrink-0" />
              <input
                type="text"
                value={github}
                onChange={e => setGithub(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-4.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-slate-800"
              />
            </div>

            <div className="flex items-center gap-3">
              <Linkedin className="w-4 h-4 text-blue-700 flex-shrink-0" />
              <input
                type="text"
                value={linkedin}
                onChange={e => setLinkedin(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-4.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-700"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800 pt-4">
            <button
              type="button"
              onClick={() => {
                setName(currentUser.name);
                setEmail(currentUser.email);
                setPhone(currentUser.phone);
                setRole(currentUser.role);
                setAddress(currentUser.address);
                setBio(currentUser.bio);
                showToast('info', 'Edits Discarded', 'Restored details back to origin data.');
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-350 transition-colors bg-slate-50 dark:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-primary/10 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
