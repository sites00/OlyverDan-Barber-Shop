import React, { useState } from 'react';
import {
  X,
  Camera,
  Plus,
  Trash2,
  Clock,
  Save,
  RotateCcw,
  Check,
  Upload,
  Scissors,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react';
import { BarberService, CutPhoto, INITIAL_CUTS, ShopInfo } from '../data/barberData';

interface BarberPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  cuts: CutPhoto[];
  onSaveCuts: (newCuts: CutPhoto[]) => void;
  services: BarberService[];
  onSaveServices: (newServices: BarberService[]) => void;
  shopInfo: ShopInfo;
  onSaveShopInfo: (newInfo: ShopInfo) => void;
}

export const BarberPanelModal: React.FC<BarberPanelModalProps> = ({
  isOpen,
  onClose,
  cuts,
  onSaveCuts,
  services,
  onSaveServices,
  shopInfo,
  onSaveShopInfo,
}) => {
  // Password state - default 'teste123'
  const [storedPassword, setStoredPassword] = useState<string>(() => {
    return localStorage.getItem('olyverdan_admin_password') || 'teste123';
  });

  const [enteredPassword, setEnteredPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // New password change fields in settings
  const [newPassword, setNewPassword] = useState('');

  const [activeTab, setActiveTab] = useState<'cuts' | 'services' | 'settings'>('cuts');

  // Form for adding new cut photo
  const [cutTitle, setCutTitle] = useState('');
  const [cutCategory, setCutCategory] = useState<'Degradê' | 'Corte Social' | 'Corte Tradicional' | 'Barba'>('Degradê');
  const [clientName, setClientName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Editable services state in modal
  const [editableServices, setEditableServices] = useState<BarberService[]>(services);

  // Editable shop settings state in modal
  const [editableShopInfo, setEditableShopInfo] = useState<ShopInfo>(shopInfo);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setSaveSuccessMessage(msg);
    setTimeout(() => setSaveSuccessMessage(null), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPassword === storedPassword) {
      setIsAuthenticated(true);
      setPasswordError(false);
      setEnteredPassword('');
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEnteredPassword('');
  };

  // Handle local image file upload (FileReader to base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setImageUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCut = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl && !imagePreview) return;

    const newCut: CutPhoto = {
      id: `client-cut-${Date.now()}`,
      title: cutTitle.trim() || 'Corte Real de Cliente',
      category: cutCategory,
      imageUrl: imagePreview || imageUrl,
      isClientPhoto: true, // Marking as real client photo
      clientName: clientName.trim() || 'Cliente Atendido',
      dateAdded: new Date().toLocaleDateString('pt-BR'),
    };

    const updated = [newCut, ...cuts];
    onSaveCuts(updated);

    // Reset form
    setCutTitle('');
    setClientName('');
    setImageUrl('');
    setImagePreview(null);
    showToast('Foto do corte do cliente adicionada com sucesso na galeria!');
  };

  const handleDeleteCut = (id: string) => {
    const updated = cuts.filter((c) => c.id !== id);
    onSaveCuts(updated);
    showToast('Foto removida da galeria.');
  };

  const handleResetDemoCuts = () => {
    if (window.confirm('Deseja restaurar as fotos de demonstração iniciais?')) {
      onSaveCuts(INITIAL_CUTS);
      showToast('Fotos padrão restauradas.');
    }
  };

  const handleServiceChange = (id: string, field: keyof BarberService, val: any) => {
    setEditableServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const handleSaveServices = () => {
    onSaveServices(editableServices);
    showToast('Preços e serviços salvos com sucesso!');
  };

  const handleSaveSettings = () => {
    onSaveShopInfo(editableShopInfo);

    if (newPassword.trim()) {
      localStorage.setItem('olyverdan_admin_password', newPassword.trim());
      setStoredPassword(newPassword.trim());
      setNewPassword('');
      showToast('Configurações e nova senha salvas com sucesso!');
    } else {
      showToast('Informações e horários atualizados!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative max-w-4xl w-full bg-[#0F1217] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0B0D11] border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#99731C] p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#0B0D11] rounded-[9px] flex items-center justify-center text-[#D4AF37]">
                <Scissors className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                Painel do Barbeiro · OlyverDan
                {isAuthenticated && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <Unlock className="w-3 h-3" />
                    Autenticado
                  </span>
                )}
              </h3>
              <p className="text-xs text-neutral-400">
                Área restrita para gerenciar fotos de cortes, preços e horários
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-lg border border-neutral-700/60 flex items-center gap-1.5 transition-colors"
                title="Bloquear painel"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Bloquear</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AUTHENTICATION SCREEN IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-6 shadow-lg shadow-[#D4AF37]/5">
              <Lock className="w-8 h-8" />
            </div>

            <h4 className="font-display text-2xl font-bold text-white">
              Acesso Restrito ao Barbeiro
            </h4>
            <p className="text-neutral-400 text-sm mt-2 max-w-md">
              Digite a senha do barbeiro para poder alterar cortes, adicionar fotos de clientes, editar preços e horários do site.
            </p>

            <form onSubmit={handlePasswordSubmit} className="mt-6 w-full max-w-sm space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  required
                  placeholder="Digite a senha..."
                  value={enteredPassword}
                  onChange={(e) => {
                    setEnteredPassword(e.target.value);
                    if (passwordError) setPasswordError(false);
                  }}
                  className={`w-full px-4 py-3 pr-11 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none transition-colors ${
                    passwordError
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-neutral-800 focus:border-[#D4AF37]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-neutral-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {passwordError && (
                <div className="p-2.5 rounded-lg bg-red-950/70 border border-red-500/30 text-red-300 text-xs flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Senha incorreta! Digite a senha correta para prosseguir.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 text-xs font-bold text-black bg-gradient-to-r from-[#E5B842] to-[#D4AF37] hover:from-[#ECC258] hover:to-[#DEB748] rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <KeyRound className="w-4 h-4" />
                <span>Entrar no Painel</span>
              </button>
            </form>

            <span className="text-[11px] text-neutral-500 mt-6">
              Senha configurada: <code className="text-[#D4AF37] font-mono bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">teste123</code>
            </span>
          </div>
        ) : (
          /* AUTHENTICATED CONTENT */
          <>
            {/* Success toast inside modal */}
            {saveSuccessMessage && (
              <div className="bg-emerald-950/90 border-b border-emerald-500/30 px-6 py-2.5 text-xs font-semibold text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{saveSuccessMessage}</span>
              </div>
            )}

            {/* Tab navigation */}
            <div className="flex border-b border-neutral-800 bg-[#0B0D11]/50 px-6 shrink-0">
              <button
                onClick={() => setActiveTab('cuts')}
                className={`py-3.5 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'cuts'
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Fotos de Cortes dos Clientes ({cuts.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`py-3.5 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'services'
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Scissors className="w-4 h-4" />
                <span>Serviços & Preços</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`py-3.5 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'settings'
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Horários, Senha & Contato</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              {/* TAB 1: CUTS & REAL CLIENT PHOTOS */}
              {activeTab === 'cuts' && (
                <div className="space-y-8">
                  {/* Form to add real customer photo */}
                  <div className="p-5 rounded-2xl bg-neutral-900 border border-[#D4AF37]/30 shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                      <Camera className="w-4 h-4 text-[#D4AF37]" />
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                        Adicionar Foto de Cliente que Cortou com Você
                      </h4>
                    </div>

                    <form onSubmit={handleAddCut} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Image Upload or URL */}
                        <div className="space-y-3">
                          <label className="block text-xs font-medium text-neutral-300">
                            1. Foto do corte (Selecione do celular ou computador)
                          </label>
                          <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-neutral-700 hover:border-[#D4AF37] rounded-xl cursor-pointer bg-neutral-950/60 transition-colors">
                            <Upload className="w-6 h-6 text-[#D4AF37] mb-1" />
                            <span className="text-xs text-neutral-300 font-medium">
                              {imagePreview ? 'Foto selecionada! Clique para trocar' : 'Escolher foto da galeria'}
                            </span>
                            <span className="text-[10px] text-neutral-500 mt-0.5">
                              Formatos JPG, PNG ou WEBP
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>

                          <div className="text-[11px] text-neutral-400">
                            <span>Ou cole a URL da imagem:</span>
                            <input
                              type="url"
                              placeholder="https://exemplo.com/foto-do-corte.jpg"
                              value={imageUrl.startsWith('data:') ? '' : imageUrl}
                              onChange={(e) => {
                                setImageUrl(e.target.value);
                                setImagePreview(e.target.value);
                              }}
                              className="mt-1 w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                            />
                          </div>
                        </div>

                        {/* Preview & Details */}
                        <div className="space-y-3">
                          {imagePreview ? (
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-neutral-700 bg-neutral-950">
                              <img
                                src={imagePreview}
                                alt="Pré-visualização do corte"
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-emerald-400 font-semibold">
                                ✓ Foto Pronta
                              </span>
                            </div>
                          ) : (
                            <div className="aspect-[4/3] rounded-xl border border-dashed border-neutral-800 bg-neutral-950 flex flex-col items-center justify-center text-neutral-600 text-xs">
                              <Camera className="w-8 h-8 mb-1" />
                              <span>A pré-visualização aparecerá aqui</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div>
                          <label className="block text-xs font-medium text-neutral-300 mb-1">
                            Estilo / Título do Corte
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: Mid Fade Navalhado com Risco"
                            value={cutTitle}
                            onChange={(e) => setCutTitle(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-neutral-300 mb-1">
                            Categoria
                          </label>
                          <select
                            value={cutCategory}
                            onChange={(e) => setCutCategory(e.target.value as any)}
                            className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          >
                            <option value="Degradê">Degradê</option>
                            <option value="Corte Social">Corte Social</option>
                            <option value="Corte Tradicional">Corte Tradicional</option>
                            <option value="Barba">Barba</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-neutral-300 mb-1">
                            Nome do Cliente (opcional)
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: Lucas Gabriel"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={!imagePreview && !imageUrl}
                        className="w-full py-3 text-xs font-bold text-black bg-[#D4AF37] hover:bg-[#ECC258] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors uppercase tracking-wider flex items-center justify-center gap-2 shadow"
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                        <span>Adicionar à Galeria de Cortes Reais</span>
                      </button>
                    </form>
                  </div>

                  {/* List of active cuts with Delete action */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-white">
                        Fotos Atualmente na Galeria ({cuts.length})
                      </h4>
                      <button
                        onClick={handleResetDemoCuts}
                        className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-400"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restaurar Fotos Padrão</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {cuts.map((cut) => (
                        <div
                          key={cut.id}
                          className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-3"
                        >
                          <img
                            src={cut.imageUrl}
                            alt={cut.title}
                            className="w-14 h-14 rounded-lg object-cover bg-black shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] text-[#D4AF37] font-semibold block uppercase">
                              {cut.category} {cut.isClientPhoto && '· Cliente Real'}
                            </span>
                            <h5 className="text-xs font-bold text-white truncate">{cut.title}</h5>
                            <p className="text-[10px] text-neutral-400 truncate">
                              {cut.clientName || 'OlyverDan'}
                            </p>
                          </div>

                          <button
                            onClick={() => handleDeleteCut(cut.id)}
                            className="p-2 text-neutral-400 hover:text-red-400 hover:bg-neutral-800 rounded-lg shrink-0 transition-colors"
                            title="Remover foto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: EDIT SERVICES & PRICES */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        Tabela de Serviços e Preços
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Edite os preços em Reais (R$) e tempos estimados para refletir o seu negócio real em Pirapora.
                      </p>
                    </div>

                    <button
                      onClick={handleSaveServices}
                      className="px-4 py-2 text-xs font-bold text-black bg-[#D4AF37] hover:bg-[#ECC258] rounded-xl flex items-center gap-1.5 shadow"
                    >
                      <Save className="w-4 h-4" />
                      <span>Salvar Alterações</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {editableServices.map((service) => (
                      <div
                        key={service.id}
                        className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
                      >
                        <div className="md:col-span-5">
                          <label className="text-[10px] text-neutral-500 uppercase font-semibold block mb-1">
                            Nome do Serviço
                          </label>
                          <input
                            type="text"
                            value={service.name}
                            onChange={(e) => handleServiceChange(service.id, 'name', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label className="text-[10px] text-neutral-500 uppercase font-semibold block mb-1">
                            Preço (R$)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1.5 text-xs text-neutral-400">R$</span>
                            <input
                              type="number"
                              step="0.5"
                              value={service.price}
                              onChange={(e) => handleServiceChange(service.id, 'price', parseFloat(e.target.value) || 0)}
                              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-bold text-white tabular-nums focus:outline-none focus:border-[#D4AF37]"
                            />
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <label className="text-[10px] text-neutral-500 uppercase font-semibold block mb-1">
                            Duração (min)
                          </label>
                          <input
                            type="number"
                            value={service.durationMinutes}
                            onChange={(e) => handleServiceChange(service.id, 'durationMinutes', parseInt(e.target.value, 10) || 0)}
                            className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white tabular-nums focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>

                        <div className="md:col-span-2 flex items-center justify-end pt-4 md:pt-0">
                          <label className="inline-flex items-center gap-1.5 text-xs text-neutral-400 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={service.popular}
                              onChange={(e) => handleServiceChange(service.id, 'popular', e.target.checked)}
                              className="rounded border-neutral-700 text-[#D4AF37]"
                            />
                            <span>Destaque</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleSaveServices}
                      className="px-6 py-2.5 text-xs font-bold text-black bg-[#D4AF37] hover:bg-[#ECC258] rounded-xl flex items-center gap-2 shadow"
                    >
                      <Save className="w-4 h-4" />
                      <span>Salvar Todos os Preços</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: SETTINGS, PASSWORD & HOURS */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      Horários, Senha de Acesso e Contato
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Atualize o número de WhatsApp, os horários e configure a senha de proteção do painel.
                    </p>
                  </div>

                  {/* Password Change Box */}
                  <div className="p-4 rounded-xl bg-neutral-950/80 border border-[#D4AF37]/30">
                    <div className="flex items-center gap-2 mb-3">
                      <KeyRound className="w-4 h-4 text-[#D4AF37]" />
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                        Segurança do Painel do Barbeiro
                      </h5>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1">
                          Senha atual
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={storedPassword}
                          className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1">
                          Alterar para nova senha (opcional)
                        </label>
                        <input
                          type="text"
                          placeholder="Digite nova senha para trocar..."
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Número do WhatsApp (apenas dígitos com DDI e DDD)
                      </label>
                      <input
                        type="text"
                        value={editableShopInfo.whatsapp}
                        onChange={(e) =>
                          setEditableShopInfo({ ...editableShopInfo, whatsapp: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                      <span className="text-[10px] text-neutral-500">Ex: 5538999878059</span>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Exibição do WhatsApp
                      </label>
                      <input
                        type="text"
                        value={editableShopInfo.whatsappDisplay}
                        onChange={(e) =>
                          setEditableShopInfo({ ...editableShopInfo, whatsappDisplay: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                      <span className="text-[10px] text-neutral-500">Ex: (38) 99987-8059</span>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Horário de Segunda a Sexta
                      </label>
                      <input
                        type="text"
                        value={editableShopInfo.openingHours.weekdays}
                        onChange={(e) =>
                          setEditableShopInfo({
                            ...editableShopInfo,
                            openingHours: {
                              ...editableShopInfo.openingHours,
                              weekdays: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Horário de Sábado
                      </label>
                      <input
                        type="text"
                        value={editableShopInfo.openingHours.saturday}
                        onChange={(e) =>
                          setEditableShopInfo({
                            ...editableShopInfo,
                            openingHours: {
                              ...editableShopInfo.openingHours,
                              saturday: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Horário de Domingo
                      </label>
                      <input
                        type="text"
                        value={editableShopInfo.openingHours.sunday}
                        onChange={(e) =>
                          setEditableShopInfo({
                            ...editableShopInfo,
                            openingHours: {
                              ...editableShopInfo.openingHours,
                              sunday: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Nome do Barbeiro
                      </label>
                      <input
                        type="text"
                        value={editableShopInfo.barberName}
                        onChange={(e) =>
                          setEditableShopInfo({ ...editableShopInfo, barberName: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleSaveSettings}
                      className="px-6 py-2.5 text-xs font-bold text-black bg-[#D4AF37] hover:bg-[#ECC258] rounded-xl flex items-center gap-2 shadow"
                    >
                      <Save className="w-4 h-4" />
                      <span>Salvar Configurações</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
