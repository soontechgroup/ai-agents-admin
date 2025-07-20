"use client";

export default function LoginInfoPanel() {
  const features = [
    {
      icon: "📊",
      title: "数据可视化",
      description: "实时监控业务数据，智能分析决策"
    },
    {
      icon: "🤖",
      title: "AI智能助手",
      description: "自动化处理，提升工作效率"
    },
    {
      icon: "🔐",
      title: "安全防护",
      description: "多重加密，保障数据安全"
    }
  ];

  return (
    <div 
      className="flex-1 flex flex-col justify-center items-center p-12 relative overflow-hidden hidden lg:flex"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* 背景渐变 */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(0, 184, 217, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(107, 92, 230, 0.1) 0%, transparent 50%)
          `
        }}
      />
      
      <div className="relative z-10 max-w-lg text-center">
        {/* 系统Logo */}
        <div 
          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-2xl font-bold text-white shadow-lg"
          style={{ 
            background: 'var(--accent-gradient)',
            boxShadow: '0 10px 30px rgba(0, 184, 217, 0.3)'
          }}
        >
          AI
        </div>
        
        {/* 系统标题 */}
        <h1 
          className="text-4xl font-bold mb-4"
          style={{
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          智能管理系统
        </h1>
        
        {/* 系统描述 */}
        <p 
          className="text-lg leading-relaxed mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          基于AI技术的新一代企业管理平台，助力数字化转型
        </p>
        
        {/* 功能特色列表 */}
        <div className="flex flex-col gap-6 text-left">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:transform hover:translate-x-2"
              style={{
                background: 'rgba(0, 184, 217, 0.05)',
                borderColor: 'var(--border-light)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 184, 217, 0.1)';
                e.currentTarget.style.borderColor = 'var(--border-default)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 184, 217, 0.05)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
              }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
                style={{ background: 'var(--accent-gradient)' }}
              >
                {feature.icon}
              </div>
              <div className="flex-1">
                <div 
                  className="font-semibold mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {feature.title}
                </div>
                <div 
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 