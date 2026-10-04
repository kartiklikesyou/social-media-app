import { useMemo, useState } from 'react';
import {
  Bell, Bookmark, ChevronDown, Compass, Feather, Heart, Home, Image as ImageIcon,
  LayoutGrid, Menu, MessageCircle, MoreHorizontal, PenLine, Plus, Search, Send,
  Settings, Sparkles, TrendingUp, UserRound, Users, X, Check, SlidersHorizontal
} from 'lucide-react';

const people = {
  mira: { name: 'Mira Chen', handle: '@mirachen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=85' },
  jon: { name: 'Jon Bell', handle: '@jonbell', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=85' },
  sofia: { name: 'Sofia Lind', handle: '@sofialind', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=85' },
  noa: { name: 'Noa Williams', handle: '@noawilliams', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=160&auto=format&fit=crop&q=85' }
};

const initialPosts = [
  {
    id: 1, author: people.mira, time: '18 min', tag: 'Design',
    text: 'A small reminder: the best interfaces don’t ask for attention. They earn it through clarity.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=85',
    likes: 284, comments: 18, liked: false, saved: false
  },
  {
    id: 2, author: people.jon, time: '42 min', tag: 'Field notes',
    text: 'Spent the morning walking the long way home. Found a bookstore, a great espresso, and this light.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=85',
    likes: 176, comments: 9, liked: true, saved: false
  },
  {
    id: 3, author: people.sofia, time: '1 hr', tag: 'Studio',
    text: 'Working on something slow and tactile. Sharing a corner of the process before it becomes too precious.',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1200&auto=format&fit=crop&q=85',
    likes: 412, comments: 31, liked: false, saved: true
  }
];

function Avatar({ person, size = 'md' }) {
  const sizes = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12' };
  return <img className={`${sizes[size]} rounded-full object-cover`} src={person.avatar} alt={`${person.name} avatar`} />;
}

function IconButton({ label, children, active = false, onClick, className = '' }) {
  return <button aria-label={label} onClick={onClick} className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:bg-[#edf1eb] focus:outline-none focus:ring-2 focus:ring-[#9bb59f] ${active ? 'text-[#496c53]' : 'text-[#758078]'} ${className}`}>{children}</button>;
}

function Sidebar({ active, setActive, onCompose }) {
  const links = [
    ['Home', Home], ['Discover', Compass], ['Messages', MessageCircle], ['Saved', Bookmark]
  ];
  return <aside className="hidden w-[238px] shrink-0 lg:block">
    <div className="sticky top-7 flex h-[calc(100vh-56px)] flex-col">
      <div className="mb-14 flex items-center gap-3 px-3"><div className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-[#3d5948] text-white"><Feather size={18} strokeWidth={2.3}/></div><span className="text-[21px] font-extrabold tracking-[-.07em]">arcccc<span className="text-[#a0bba3]">.</span></span></div>
      <nav className="space-y-1">
        {links.map(([label, Icon]) => <button key={label} onClick={() => setActive(label)} className={`nav-pill flex w-full items-center gap-3 rounded-[13px] px-3 py-3 text-[13px] font-semibold ${active === label ? 'bg-[#e5eee5] text-[#35563f]' : 'text-[#7b847d] hover:bg-[#edf1eb]'}`}><Icon size={18} strokeWidth={active === label ? 2.2 : 1.8}/>{label}{label === 'Messages' && <span className="ml-auto rounded-full bg-[#d1e1d3] px-2 py-0.5 text-[10px] text-[#416047]">3</span>}</button>)}
      </nav>
      <div className="my-8 h-px bg-[#e4e7e2]" />
      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#a3aaa4]">Your spaces</p>
      <button className="flex items-center gap-3 rounded-[13px] px-3 py-3 text-left text-[13px] font-semibold text-[#69746c] hover:bg-[#edf1eb]"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e8dfd3] text-[11px] text-[#8a6e4b]">✦</span>Quiet makers</button>
      <button className="flex items-center gap-3 rounded-[13px] px-3 py-3 text-left text-[13px] font-semibold text-[#69746c] hover:bg-[#edf1eb]"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#dce6ef] text-[11px] text-[#61758b]">◌</span>Field notes</button>
      <button className="mt-2 flex items-center gap-3 px-3 py-3 text-[12px] font-semibold text-[#9aa29c] hover:text-[#496c53]"><Plus size={16}/>Explore spaces</button>
      <div className="mt-auto flex items-center gap-3 rounded-2xl border border-[#e3e7e1] bg-white/50 p-3"><Avatar person={{ name: 'You', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=85' }} size="sm"/><div className="min-w-0 flex-1"><p className="truncate text-[12px] font-bold">Avery Stone</p><p className="truncate text-[10px] text-[#929b94]">@averystone</p></div><Settings size={15} className="text-[#9ca59e]"/></div>
    </div>
  </aside>;
}

function MobileHeader({ onCompose, onMenu }) {
  return <header className="flex items-center justify-between border-b border-[#e4e8e3] px-5 py-4 lg:hidden"><button onClick={onMenu} aria-label="Open menu"><Menu size={21} className="text-[#536158]"/></button><div className="flex items-center gap-2"><div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[#3d5948] text-white"><Feather size={14}/></div><span className="text-[18px] font-extrabold tracking-[-.07em]">arc<span className="text-[#a0bba3]">.</span></span></div><button onClick={onCompose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3d5948] text-white"><Plus size={17}/></button></header>;
}

function Topbar({ query, setQuery, onCompose }) {
  return <div className="mb-8 flex items-center justify-between gap-5"><div><p className="mb-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#8b958d]">Wednesday, April 24</p><h1 className="font-display text-[34px] leading-tight tracking-[-.04em] text-[#27322c] sm:text-[39px]">Good morning, Avery<span className="text-[#91ad95]">.</span></h1></div><div className="hidden items-center gap-3 sm:flex"><div className="relative"><Search size={16} className="absolute left-3 top-3 text-[#a1aaa3]"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Arc" className="h-10 w-[178px] rounded-xl border border-[#e2e7e1] bg-white/70 pl-9 pr-3 text-[12px] outline-none placeholder:text-[#a3aaa5] focus:border-[#a9c1ac]"/></div><IconButton label="Notifications"><Bell size={18}/><span className="absolute ml-5 mt-[-18px] h-1.5 w-1.5 rounded-full bg-[#d9785d]"/></IconButton><button onClick={onCompose} className="flex h-10 items-center gap-2 rounded-xl bg-[#3d5948] px-4 text-[12px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#304a39]"><PenLine size={15}/>Share a thought</button></div></div>;
}

function StoryRail() {
  const stories = [people.mira, people.jon, people.sofia, people.noa];
  return <div className="mb-7 overflow-x-auto hide-scrollbar"><div className="flex min-w-max items-center gap-5"><button className="group flex w-[58px] flex-col items-center gap-2"><div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-[#9eb5a1] bg-[#edf3ed] text-[#59795f] transition group-hover:bg-[#e3eee4]"><Plus size={18}/></div><span className="text-[10px] font-semibold text-[#8c958e]">Your story</span></button>{stories.map((person, i) => <button key={person.name} className="group flex w-[58px] flex-col items-center gap-2"><div className={`rounded-full p-[2px] ${i === 0 ? 'bg-[#7ea487]' : 'bg-[#dbe6dc]'}`}><div className="rounded-full bg-[#f7f7f4] p-[2px]"><Avatar person={person} size="md"/></div></div><span className="max-w-full truncate text-[10px] font-semibold text-[#78827b]">{person.name.split(' ')[0]}</span></button>)}</div></div>;
}

function PostCard({ post, onUpdate }) {
  const update = (changes) => onUpdate(post.id, changes);
  return <article className="post-card card-shadow overflow-hidden rounded-[20px] border border-[#e6eae5] bg-white transition-all duration-300 hover:-translate-y-0.5"><div className="flex items-center gap-3 px-5 pb-4 pt-5"><Avatar person={post.author}/><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="text-[12px] font-bold text-[#29342d]">{post.author.name}</p><span className="text-[11px] text-[#a3aaa4]">· {post.time}</span></div><p className="text-[10px] text-[#9aa39c]">{post.author.handle} <span className="mx-1 text-[#c1c8c1]">·</span> {post.tag}</p></div><IconButton label="More options"><MoreHorizontal size={18}/></IconButton></div><p className="px-5 pb-4 text-[14px] leading-[1.65] tracking-[-.01em] text-[#4b574f]">{post.text}</p><div className="relative aspect-[16/9] overflow-hidden bg-[#edf0eb]"><img className="post-image h-full w-full object-cover" src={post.image} alt="A moment shared by the author"/><div className="absolute bottom-3 right-3 rounded-full bg-[#1d2421]/55 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">{post.tag}</div></div><div className="flex items-center gap-1 px-4 py-3"><button onClick={() => update({ liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 })} className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-semibold transition hover:bg-[#f5f7f3] ${post.liked ? 'text-[#cf6f65]' : 'text-[#8b958d]'}`}><Heart size={16} fill={post.liked ? 'currentColor' : 'none'}/>{post.likes}</button><button className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-[#8b958d] transition hover:bg-[#f5f7f3]"><MessageCircle size={16}/>{post.comments}</button><button className="ml-auto flex items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-[#8b958d] transition hover:bg-[#f5f7f3]"><Send size={15}/></button><button onClick={() => update({ saved: !post.saved })} aria-label="Save post" className={`flex items-center rounded-lg px-2 py-1.5 transition hover:bg-[#f5f7f3] ${post.saved ? 'text-[#496c53]' : 'text-[#8b958d]'}`}><Bookmark size={16} fill={post.saved ? 'currentColor' : 'none'}/></button></div></article>;
}

function RightRail() {
  const [followed, setFollowed] = useState([]);
  const suggested = [people.noa, { name: 'Theo Grant', handle: '@theogrant', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=85' }, { name: 'Lena Ortiz', handle: '@lenaortiz', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=85' }];
  return <aside className="hidden w-[265px] shrink-0 xl:block"><div className="sticky top-7 space-y-5"><section className="rounded-[20px] border border-[#e5e9e3] bg-white/65 p-5"><div className="mb-5 flex items-center justify-between"><h2 className="text-[12px] font-extrabold tracking-[-.01em]">People to follow</h2><button className="text-[10px] font-bold text-[#6b886f] hover:underline">See all</button></div>{suggested.map(person => <div key={person.name} className="mb-4 flex items-center gap-3 last:mb-0"><Avatar person={person} size="sm"/><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-bold">{person.name}</p><p className="truncate text-[10px] text-[#9aa39c]">{person.handle}</p></div><button onClick={() => setFollowed([...followed, person.name])} className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-bold transition ${followed.includes(person.name) ? 'border-[#d9e6da] bg-[#edf4ed] text-[#66816b]' : 'border-[#dfe6df] text-[#66816b] hover:bg-[#edf4ed]'}`}>{followed.includes(person.name) ? <Check size={13}/> : 'Follow'}</button></div>)}</section><section className="rounded-[20px] bg-[#e9f0e9] p-5"><div className="mb-3 flex items-center gap-2 text-[#55735b]"><Sparkles size={15}/><span className="text-[11px] font-extrabold">A gentler internet</span></div><p className="text-[11px] leading-[1.65] text-[#6e8272]">Arc is a place for considered thoughts, beautiful details, and the people who notice them.</p><button className="mt-4 text-[10px] font-bold text-[#4d6e55] hover:underline">Learn about our principles →</button></section><p className="px-2 text-[10px] leading-5 text-[#a3aaa4]">About · Guidelines · Privacy · Terms<br/>© 2024 Arc Network</p></div></aside>;
}

function ComposeModal({ onClose, onPublish }) {
  const [text, setText] = useState('');
  const [posted, setPosted] = useState(false);
  const submit = () => { if (!text.trim()) return; setPosted(true); setTimeout(() => { onPublish(text); onClose(); }, 700); };
  return <div className="modal-backdrop fixed inset-0 z-50 flex items-end justify-center bg-[#1c2821]/35 p-0 backdrop-blur-[3px] sm:items-center sm:p-5"><div className="modal-panel w-full max-w-[560px] rounded-t-[24px] bg-[#fbfcfa] p-6 shadow-[0_30px_90px_rgba(29,36,33,.25)] sm:rounded-[24px]"><div className="mb-6 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#8e9a90]">New post</p><h2 className="mt-1 font-display text-[27px] tracking-[-.03em]">What’s on your mind?</h2></div><IconButton label="Close" onClick={onClose}><X size={19}/></IconButton></div><div className="flex gap-3"><Avatar person={{ name: 'Avery Stone', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=85' }}/><textarea autoFocus value={text} onChange={e => setText(e.target.value)} placeholder="Share a thought, a moment, or something you noticed..." className="min-h-[125px] flex-1 resize-none bg-transparent pt-1 text-[14px] leading-7 text-[#455149] outline-none placeholder:text-[#adb5ae]"/></div><div className="mt-5 flex items-center justify-between border-t border-[#e8ece7] pt-4"><div className="flex gap-1 text-[#91a097]"><IconButton label="Add image"><ImageIcon size={18}/></IconButton><IconButton label="Add feeling"><Sparkles size={17}/></IconButton></div><button disabled={!text.trim() || posted} onClick={submit} className="flex min-w-[105px] items-center justify-center gap-2 rounded-xl bg-[#3d5948] px-4 py-2.5 text-[12px] font-bold text-white transition hover:bg-[#304a39] disabled:cursor-not-allowed disabled:opacity-50">{posted ? <><Check size={15}/>Posted</> : <>Share <Send size={14}/></>}</button></div></div></div>;
}

function App() {
  const [active, setActive] = useState('Home');
  const [query, setQuery] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [compose, setCompose] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  const [filter, setFilter] = useState('For you');
  const visiblePosts = useMemo(() => query ? posts.filter(p => `${p.author.name} ${p.text} ${p.tag}`.toLowerCase().includes(query.toLowerCase())) : posts, [posts, query]);
  const updatePost = (id, changes) => setPosts(current => current.map(p => p.id === id ? { ...p, ...changes } : p));
  const publish = (text) => setPosts([{ id: Date.now(), author: { name: 'Avery Stone', handle: '@averystone', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=85' }, time: 'now', tag: 'Thoughts', text, image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop&q=85', likes: 0, comments: 0, liked: false, saved: false }, ...posts]);
  return <div className="app-shell min-h-screen"><MobileHeader onCompose={() => setCompose(true)} onMenu={() => setMobileMenu(!mobileMenu)}/><div className="mx-auto flex max-w-[1440px] gap-8 px-5 py-7 sm:px-8 lg:px-10"><Sidebar active={active} setActive={setActive} onCompose={() => setCompose(true)}/><main className="min-w-0 max-w-[650px] flex-1 lg:pt-1"><Topbar query={query} setQuery={setQuery} onCompose={() => setCompose(true)}/><StoryRail/><div className="mb-5 flex items-center justify-between border-b border-[#e1e6e0] pb-3"><div className="flex gap-5"><button onClick={() => setFilter('For you')} className={`relative pb-2 text-[12px] font-bold ${filter === 'For you' ? 'text-[#344b3b]' : 'text-[#a1aaa3]'}`}>For you{filter === 'For you' && <span className="absolute -bottom-[13px] left-0 h-[2px] w-full rounded-full bg-[#5f8665]"/>}</button><button onClick={() => setFilter('Following')} className={`relative pb-2 text-[12px] font-bold ${filter === 'Following' ? 'text-[#344b3b]' : 'text-[#a1aaa3]'}`}>Following{filter === 'Following' && <span className="absolute -bottom-[13px] left-0 h-[2px] w-full rounded-full bg-[#5f8665]"/>}</button></div><button className="flex items-center gap-1 text-[11px] font-semibold text-[#9ba49d]"><SlidersHorizontal size={14}/> Curate</button></div>{visiblePosts.length ? <div className="space-y-5">{visiblePosts.map(post => <PostCard key={post.id} post={post} onUpdate={updatePost}/>)}</div> : <div className="rounded-2xl border border-dashed border-[#d6dfd6] p-12 text-center"><Search className="mx-auto mb-3 text-[#a2b3a4]"/><p className="text-sm font-bold">Nothing found</p><p className="mt-1 text-xs text-[#929d95]">Try a different name or topic.</p></div>}</main><RightRail/></div>{mobileMenu && <div className="fixed inset-0 z-40 bg-[#1c2821]/25 lg:hidden" onClick={() => setMobileMenu(false)}><div className="h-full w-[275px] bg-[#fbfcfa] p-6 shadow-2xl" onClick={e => e.stopPropagation()}><div className="mb-12 flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-[#3d5948] text-white"><Feather size={18}/></div><span className="text-[21px] font-extrabold tracking-[-.07em]">arc<span className="text-[#a0bba3]">.</span></span></div>{['Home','Discover','Messages','Saved'].map(label => <button key={label} onClick={() => { setActive(label); setMobileMenu(false); }} className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${active === label ? 'bg-[#e5eee5] text-[#35563f]' : 'text-[#7b847d]'}`}>{label}</button>)}</div></div>}{compose && <ComposeModal onClose={() => setCompose(false)} onPublish={publish}/>}</div>;
}

export default App;