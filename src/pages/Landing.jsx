import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Layers, CheckCircle, ArrowRight, Zap, Award, Users } from 'lucide-react';

export default function Landing() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 sticky top-0 z-10 border-b" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: 'var(--brand)', fontFamily: "'Lora', serif" }}>R</div>
          <span className="font-bold text-lg" style={{ fontFamily: "'Lora', serif", color: 'var(--text)' }}>ReviewHub</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors hover:opacity-80" style={{ color: 'var(--text2)' }}>Log In</Link>
          <Link to="/signup" className="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90" style={{ background: 'var(--brand)' }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-6 text-center" style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-mid) 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-48 h-48 rounded-full bg-white" />
          <div className="absolute bottom-0 right-10 w-72 h-72 rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white bg-opacity-20 text-white text-sm font-medium mb-6">
            <Zap size={15} /> Smart Review. Real Results.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Lora', serif" }}>
            Ace Your Board Exam with <span className="underline decoration-wavy decoration-white/40">ReviewHub</span>
          </h1>
          <p className="text-lg text-white opacity-85 mb-8 leading-relaxed">
            Structured review modules, adaptive quizzes, and progress tracking — everything you need to pass.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white hover:opacity-90 transition-opacity" style={{ color: 'var(--brand)' }}>
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white border-2 border-white border-opacity-40 hover:border-opacity-80 transition-colors">
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          {[
            { icon: <Users size={22} />, value: '2,400+', label: 'Active Reviewees' },
            { icon: <Award size={22} />, value: '89%', label: 'Average Pass Rate' },
            { icon: <BookOpen size={22} />, value: '200+', label: 'Practice Questions' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>{s.icon}</div>
              <div className="text-2xl font-bold" style={{ fontFamily: "'Lora', serif", color: 'var(--text)' }}>{s.value}</div>
              <div className="text-sm" style={{ color: 'var(--text3)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Lora', serif", color: 'var(--text)' }}>Everything you need to pass</h2>
            <p className="text-base" style={{ color: 'var(--text2)' }}>Curated content for every major licensure exam</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: <GraduationCap size={24} />, title: 'Licensure Exams', desc: 'Comprehensive review for LET, NLE, Bar, Engineering boards, and more.', bg: '#eff6ff', color: '#3b7dd8' },
              { icon: <BookOpen size={24} />, title: 'Academic Prep', desc: 'Subject-specific quizzes for college entrance tests and academic competitions.', bg: '#f5f3ff', color: '#7c4dcc' },
              { icon: <Layers size={24} />, title: 'Certification Tracks', desc: 'IT, project management, and professional certification prep courses.', bg: '#ecfeff', color: '#0891b2' },
            ].map(f => (
              <div key={f.title} className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: f.bg, color: f.color }}>{f.icon}</div>
                <h3 className="font-bold mb-2" style={{ fontFamily: "'Lora', serif", color: 'var(--text)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 border-t" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Lora', serif", color: 'var(--text)' }}>How it works</h2>
            <p style={{ color: 'var(--text2)' }}>Three simple steps to your review journey</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Create your account', desc: 'Sign up and wait for your admin to grant access to your review products.' },
              { step: '02', title: 'Study your modules', desc: 'Work through structured topics at your own pace with detailed content.' },
              { step: '03', title: 'Take quizzes & track progress', desc: 'Test yourself and watch your scores improve over time.' },
            ].map(s => (
              <div key={s.step} className="flex gap-4">
                <div className="text-3xl font-bold flex-shrink-0 leading-none mt-1" style={{ color: 'var(--brand-soft)', fontFamily: "'Lora', serif" }}>{s.step}</div>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: 'var(--text)' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center" style={{ background: 'var(--bg)' }}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Lora', serif", color: 'var(--text)' }}>Ready to start reviewing?</h2>
          <p className="mb-6" style={{ color: 'var(--text2)' }}>Create your account today and take the first step toward passing your exam.</p>
          <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white text-sm hover:opacity-90 transition-opacity" style={{ background: 'var(--brand)' }}>
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-8 border-t text-center" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <p className="text-sm" style={{ color: 'var(--text3)' }}>© 2026 ReviewHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
