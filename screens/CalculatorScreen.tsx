import React, { useState, useEffect } from 'react';

interface Props {
  onBack: () => void;
  onProceed: () => void;
}

// --- DATA CONSTANTS ---

// Type 1: Unitary (Quantity of items)
const TYPE_1_UNITARY = [
  "CÁPSULAS E/OU COMPRIMIDOS",
  "ÓVULOS",
  "SUPOSITÓRIOS",
  "PAPEL MEDICAMENTOSO",
  "SACHÊS",
  "BALAS DE GOMAS",
  "BALAS DE CHOCOLATE",
  "STRIP (FILME ORODISPERSÍVEL)",
  "OUTRAS" 
];

// Type 2: Percentage / QSP (Total Volume/Weight)
const TYPE_2_QSP = [
  "CREMES",
  "POMADAS (UNGUENTOS, VASELINA)",
  "GÉIS",
  "SOLUÇÃO ORAL",
  "SOLUÇÃO EXTERNA (SOLUÇÃO TÓPICA)",
  "SÉRUM",
  "EMULSÃO",
  "TALCO",
  "LOÇÃO"
];

// Type 3: Syrups/Suspensions (mg/ml or %)
const TYPE_3_FLUIDOS = [ 
  "XAROPES",
  "SUSPENSÕES",
  "SOLUÇÃO ORAL EM GOTAS",
  "INALANTE",
  "DESODORANTE", 
  "AEROSSOL"
];

const FORM_OPTIONS = [
  { name: "CÁPSULAS E/OU COMPRIMIDOS", icon: "pill", tooltip: "Forma sólida onde o medicamento é envolto em um invólucro gelatinoso (duro ou mole). Ideal para mascarar sabor e facilitar a deglutição." },
  { name: "STRIP (FILME ORODISPERSÍVEL)", icon: "layers", tooltip: "Lâmina fina que se dissolve rapidamente na boca sem necessidade de água. Rápida absorção." },
  { name: "POMADAS (UNGUENTOS, VASELINA)", icon: "healing", tooltip: "Preparações semissólidas, gordurosas, que formam uma camada protetora na pele. Maior tempo de ação local." },
  { name: "GÉIS", icon: "water_drop", tooltip: "Forma semissólida transparente à base de água. Não engordura a pele e seca rápido. Ótimo para peles oleosas." },
  { name: "ÓVULOS", icon: "egg", tooltip: "Forma sólida de dose única para aplicação vaginal, que se funde à temperatura corporal para liberar o ativo." },
  { name: "SUPOSITÓRIOS", icon: "medication", tooltip: "Forma sólida para aplicação retal. Funde-se ou dissolve-se no corpo. Usado quando a via oral não é possível." },
  { name: "PAPEL MEDICAMENTOSO", icon: "description", tooltip: "Pós medicamentosos embalados individualmente em papéis dobrados, para dissolução ou ingestão direta." },
  { name: "SOLUÇÃO ORAL", icon: "local_drink", tooltip: "Mistura líquida homogênea para ser ingerida. O ativo está totalmente dissolvido no veículo." },
  { name: "SOLUÇÃO ORAL EM GOTAS", icon: "water_drop", tooltip: "Solução concentrada para ser dosada em gotas. Permite ajuste fino da dose." },
  { name: "SOLUÇÃO EXTERNA (TÓPICA)", icon: "science", tooltip: "Líquido para aplicação na pele ou mucosas (ex: loções capilares, antissépticos)." },
  { name: "XAROPES", icon: "medication_liquid", tooltip: "Solução aquosa com açúcar ou adoçante, viscosa. Mascara sabores desagradáveis. Comum para uso infantil." },
  { name: "INALANTE", icon: "air", tooltip: "Preparações destinadas a serem inaladas na forma de vapor ou aerossol para atingir os pulmões." },
  { name: "DESODORANTE", icon: "sanitizer", tooltip: "Solução alcoólica ou aquosa aplicada via spray para ação local, geralmente nas axilas ou pés." },
  { name: "TALCO", icon: "grain", tooltip: "Pó fino para aplicação na pele. Absorve umidade e reduz atrito. Comum em antifúngicos." },
  { name: "AEROSSOL", icon: "air", tooltip: "Sistema pressurizado que libera o produto em forma de nuvem de partículas finas." },
  { name: "SUSPENSÕES", icon: "science", tooltip: "Líquido contendo partículas sólidas não dissolvidas. É necessário agitar antes de usar." },
  { name: "CREMES", icon: "sentiment_satisfied", tooltip: "Emulsão semissólida contendo água e óleo. Boa espalhabilidade e hidratação. A forma mais comum para uso tópico." },
  { name: "SACHÊS", icon: "mail", tooltip: "Embalagem individual contendo pó para ser dissolvido em água antes de beber. Ótimo para colágeno e suplementos." },
  { name: "BALAS DE GOMAS", icon: "cookie", tooltip: "Gomas mastigáveis medicamentosas. Forma agradável de ingerir vitaminas e suplementos, especialmente para crianças." },
  { name: "BALAS DE CHOCOLATE", icon: "cookie", tooltip: "Chocolate medicamentoso. Mascara sabores amargos e melhora a adesão ao tratamento." },
  { name: "SÉRUM", icon: "opacity", tooltip: "Fluido leve, de rápida absorção e alta concentração de ativos. Muito usado em dermocosméticos faciais." },
  { name: "EMULSÃO", icon: "water_ph", tooltip: "Mistura de dois líquidos que não se misturam naturalmente (água e óleo), estabilizada. Textura leitosa." },
  { name: "OUTRAS", icon: "add_circle", tooltip: "Qualquer outra forma não listada acima. Descreva no campo específico." }
];

// Dynamic Subtypes Mapping
const SUBTYPES_MAP: Record<string, { name: string, icon: string, tooltip: string }[]> = {
  "CÁPSULAS E/OU COMPRIMIDOS": [
    { name: "CAPS REVESTIDAS", icon: "layers", tooltip: "Cápsulas com revestimento especial para facilitar a deglutição, mascarar sabor ou proteger o estômago." },
    { name: "CAPS SUBLINGUAL", icon: "flash_on", tooltip: "Para absorção rápida debaixo da língua, evitando a passagem pelo fígado. Ação mais veloz." },
    { name: "CAPS GASTRORESISTENTE", icon: "shield", tooltip: "Resistem ao suco gástrico e liberam o medicamento apenas no intestino. Ideal para estômagos sensíveis." },
    { name: "CAPS VEGANA", icon: "eco", tooltip: "Cápsulas feitas de origem 100% vegetal (celulose), sem componentes animais (gelatina)." },
    { name: "CAPS PRONTA", icon: "inventory_2", tooltip: "ATENÇÃO: São cápsulas comerciais já industrializadas. Não é possível manipular a dose exata, apenas a quantidade de caixas." },
    { name: "OUTROS ANÁLOGOS", icon: "edit", tooltip: "Outro tipo específico não listado. Digite o nome no campo que aparecerá." }
  ],
  "CREMES": [
    { name: "CREME POLAWAX", icon: "water_drop", tooltip: "Creme com cera autoemulsionante, toque suave e boa espalhabilidade. Padrão para maioria das formulações." },
    { name: "CREME NÃO IÔNICO", icon: "science", tooltip: "Base neutra, compatível com a maioria dos ativos, especialmente ácidos e sais. Menor risco de irritação." },
    { name: "CREME ANIÔNICO", icon: "soap", tooltip: "Base com carga negativa. Útil para ativos específicos, mas menos versátil que o não iônico." },
    { name: "CREME HIPOALERGÊNICO", icon: "spa", tooltip: "Livre de parabenos, corantes e fragrâncias. Ideal para peles sensíveis, bebês e alérgicos." },
    { name: "CREME", icon: "sentiment_satisfied", tooltip: "Creme base padrão." },
    { name: "BASE GOLD", icon: "diamond", tooltip: "Veículo nobre com toque aveludado, alta hidratação e absorção superior. Ideal para dermocosméticos de luxo." },
    { name: "EMULSÃO", icon: "water_ph", tooltip: "Textura mais fluida que o creme, mistura de água e óleo. Boa para áreas extensas." },
    { name: "SÉRUM", icon: "opacity", tooltip: "Fluido leve, aquoso ou siliconado, alta concentração de ativos e rápida absorção." },
    { name: "LOÇÃO LANETTE", icon: "sanitizer", tooltip: "Loção baseada em cera Lanette. Toque seco e estável." },
    { name: "LOÇÃO POLAWAX", icon: "sanitizer", tooltip: "Loção mais emoliente e hidratante com Polawax." },
    { name: "LOÇÃO ANIÔNICA", icon: "science", tooltip: "Loção com emulsificante aniônico." },
    { name: "LOÇÃO NÃO IÔNICA", icon: "science", tooltip: "Loção versátil compatível com ampla gama de ativos." },
    { name: "OUTROS: EDITÁVEL", icon: "edit", tooltip: "Especifique outro tipo de veículo ou base não listado." }
  ]
};

const DEFAULT_SUBTYPES = [
    { name: "PADRÃO", icon: "check_circle", tooltip: "Subtipo padrão." },
    { name: "OUTROS", icon: "edit", tooltip: "Especifique outro tipo." }
];

const UNIT_OPTIONS = [
  { value: "kg", label: "kg", tooltip: "QUILOGRAMA. Corresponde a 1.000 gramas. Usada para grandes quantidades." },
  { value: "g", label: "g", tooltip: "GRAMA. Unidade padrão de massa. Ex: Um clipe de papel pesa aprox. 1g." },
  { value: "mg", label: "mg", tooltip: "MILIGRAMA. É a milésima parte de 1 grama (1g = 1000mg). Muito comum em cápsulas." },
  { value: "µg", label: "µg", tooltip: "MICROGRAMA. Símbolo técnico. É a milionésima parte de 1 grama. Usado em hormônios." },
  { value: "mcg", label: "mcg", tooltip: "MICROGRAMA. O mesmo que µg, mas escrito por extenso. Comum em vitaminas (B12, D)." },
  { value: "ng", label: "ng", tooltip: "NANOGRAMA. Unidade extremamente pequena. Mil vezes menor que o micrograma." },
  { value: "L", label: "L", tooltip: "LITRO. Unidade de volume. Corresponde a 1000 mililitros." },
  { value: "mL", label: "mL", tooltip: "MILILITRO. Unidade de volume mais comum para xaropes e soluções." },
  { value: "µL", label: "µL", tooltip: "MICROLITRO. Volume minúsculo, mil vezes menor que 1 mL." },
  { value: "% m/m", label: "% m/m", tooltip: "PORCENTAGEM MASSA/MASSA. Ex: 2g de ativo em 100g de creme total." },
  { value: "% m/v", label: "% m/v", tooltip: "PORCENTAGEM MASSA/VOLUME. Ex: 2g de ativo em 100ml de solução." },
  { value: "% v/v", label: "% v/v", tooltip: "PORCENTAGEM VOLUME/VOLUME. Ex: 2ml de óleo em 100ml de loção." },
  { value: "%", label: "%", tooltip: "PORCENTAGEM GERAL. Concentração do ativo em relação ao total da fórmula." },
  { value: "mg/g", label: "mg/g", tooltip: "MILIGRAMAS POR GRAMA. Ex: 50mg de ativo em cada 1g de creme." },
  { value: "mcg/g", label: "mcg/g", tooltip: "MICROGRAMAS POR GRAMA. Doses muito baixas diluídas em cada grama de creme." }
];

// Market Intelligence Limits (Min/Max)
const INGREDIENT_LIMITS: Record<string, { min: number; max: number; unit: string }> = {
    "VITAMINA C": { min: 100, max: 2000, unit: "mg" },
    "VITAMINA D3": { min: 200, max: 50000, unit: "UI" },
    "COLÁGENO": { min: 500, max: 10000, unit: "mg" },
    "ÁCIDO HIALURÔNICO": { min: 50, max: 500, unit: "mg" },
    "MINOXIDIL": { min: 2, max: 5, unit: "%" }, // Common topical range
    "UREIA": { min: 3, max: 40, unit: "%" },
    "MELATONINA": { min: 0.2, max: 20, unit: "mg" },
    "BIOTINA": { min: 2, max: 10, unit: "mg" },
    "ZINCO": { min: 5, max: 50, unit: "mg" },
    "MAGNÉSIO": { min: 100, max: 500, unit: "mg" },
    "VITAMINA E": { min: 100, max: 1000, unit: "UI" },
    "RESVERATROL": { min: 10, max: 200, unit: "mg" }
};

// Mock Database for Autocomplete
const INGREDIENT_DB = [
  "ÁCIDO HIALURÔNICO", "ÁCIDO GLICÓLICO", "ÁCIDO RETINÓICO", "ALANINA", "ALANTOÍNA",
  "BIOTINA", "BENZOCAÍNA", "BETAMETASONA",
  "CAFEÍNA", "CÁLCIO", "CÂNFORA", "CETOCONAZOL", "CLINDAMICINA", "COLÁGENO",
  "DEXAMETASONA", "DIPIRONA",
  "FINASTERIDA", "FLUCONAZOL",
  "HIDROQUINONA",
  "IBUPROFENO",
  "L-CARNITINA", "LIDOCAÍNA",
  "MAGNÉSIO", "MELATONINA", "MENTOL", "MINOXIDIL",
  "NIACINAMIDA",
  "OMEPRAZOL",
  "PANTENOL", "PARACETAMOL",
  "RESVERATROL",
  "SELÊNIO",
  "TADALAFILA",
  "UREIA",
  "VITAMINA A", "VITAMINA B12", "VITAMINA C", "VITAMINA D3", "VITAMINA E",
  "ZINCO"
];

// Expanded Popular Suggestions List
const POPULAR_SUGGESTIONS = [
    { name: 'Vitamina D3', sub: 'Colecalciferol', icon: 'sunny', color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400', desc: "Essencial para absorção de cálcio, saúde óssea e sistema imunológico." },
    { name: 'Ácido Hialurônico', sub: 'Hidratação Profunda', icon: 'water_drop', color: 'bg-blue-100 text-blue-500 dark:bg-blue-900/40 dark:text-blue-400', desc: "Molécula que retém água, proporcionando hidratação intensa e preenchimento de linhas finas na pele." },
    { name: 'Minoxidil', sub: 'Crescimento Capilar', icon: 'face', color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400', desc: "Vasodilatador que estimula a circulação nos folículos pilosos, promovendo o crescimento de cabelo e barba." },
    { name: 'Vitamina C', sub: 'Antioxidante', icon: 'bolt', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400', desc: "Poderoso antioxidante que combate radicais livres, clareia manchas e estimula a produção de colágeno." },
    { name: 'Colágeno', sub: 'Pele e Articulações', icon: 'spa', color: 'bg-pink-100 text-pink-500 dark:bg-pink-900/40 dark:text-pink-400', desc: "Proteína estrutural que dá firmeza à pele e integridade às articulações e tendões." },
    { name: 'Melatonina', sub: 'Sono Reparador', icon: 'bedtime', color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400', desc: "Hormônio que regula o ciclo vigília-sono, ajudando a adormecer mais rápido e ter um sono de qualidade." },
    { name: 'Cafeína', sub: 'Estimulante', icon: 'local_cafe', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400', desc: "Estimulante do sistema nervoso central. Em cosméticos, ajuda a reduzir olheiras e celulite." },
    { name: 'Magnésio', sub: 'Saúde Muscular', icon: 'fitness_center', color: 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300', desc: "Mineral vital para função muscular, nervosa e óssea. Ajuda a prevenir câimbras e melhora o relaxamento." },
    { name: 'Zinco', sub: 'Imunidade', icon: 'shield', color: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400', desc: "Mineral importante para o sistema imunológico, cicatrização da pele e síntese de proteínas." },
    { name: 'Biotina', sub: 'Cabelo e Unhas', icon: 'content_cut', color: 'bg-rose-100 text-rose-500 dark:bg-rose-900/40 dark:text-rose-400', desc: "Também conhecida como Vitamina B7, fortalece unhas quebradiças e previne queda de cabelo." },
    { name: 'Resveratrol', sub: 'Anti-idade', icon: 'timelapse', color: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400', desc: "Polifenol encontrado em uvas, com forte ação antioxidante e anti-inflamatória." },
    { name: 'Ômega 3', sub: 'Saúde Cardíaca', icon: 'favorite', color: 'bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-300', desc: "Ácido graxo essencial que reduz inflamação, triglicerídeos e promove saúde cardiovascular e cerebral." },
];

interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

export default function CalculatorScreen({ onBack, onProceed }: Props) {
  const [step, setStep] = useState<'list' | 'add'>('list');
  const [formOpen, setFormOpen] = useState(false);
  const [subtypeOpen, setSubtypeOpen] = useState(false); 
  const [unitOpen, setUnitOpen] = useState(false); // NEW STATE FOR UNIT DROPDOWN

  const [selectedForm, setSelectedForm] = useState('CREMES');
  // Initialize with correct default for Creams
  const [selectedSubtype, setSelectedSubtype] = useState('CREME POLAWAX');
  const [currentSubtypes, setCurrentSubtypes] = useState(SUBTYPES_MAP['CREMES']);
  
  const [customSubtypeName, setCustomSubtypeName] = useState(''); 

  const [formType, setFormType] = useState<1 | 2 | 3 | 4>(2);
  const [usageType, setUsageType] = useState<'INTERNO' | 'EXTERNO' | 'MISTO'>('EXTERNO');
  
  const [customFormName, setCustomFormName] = useState('');
  const [tooltipModal, setTooltipModal] = useState<{title: string, content: string} | null>(null);
  const [observation, setObservation] = useState('');

  const [hasShownWarning, setHasShownWarning] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  
  const [showOcrDisclaimer, setShowOcrDisclaimer] = useState(false); // New state for OCR Disclaimer

  // OCR States
  const [isScanning, setIsScanning] = useState(false);
  const [ocrSuccess, setOcrSuccess] = useState(false);

  const [quantity, setQuantity] = useState<number>(100); 
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: 1, name: 'UREIA', amount: 10, unit: '%' },
    { id: 2, name: 'ÓLEO DE AMÊNDOAS', amount: 5, unit: '%' }
  ]);

  const [newIngName, setNewIngName] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [newIngAmount, setNewIngAmount] = useState('');
  const [newIngUnit, setNewIngUnit] = useState<string>('mg'); // Default unit
  const [validationError, setValidationError] = useState<string | null>(null);

  // --- AUTOMATIC LOGIC ---
  useEffect(() => {
    // 1. Set Form Type (Calculations)
    if (TYPE_1_UNITARY.some(f => selectedForm.startsWith(f))) {
      setFormType(1);
      if (formType !== 1) setQuantity(30); 
    } else if (TYPE_2_QSP.some(f => selectedForm.startsWith(f))) {
      setFormType(2);
      if (formType !== 2) setQuantity(100); 
    } else if (TYPE_3_FLUIDOS.some(f => selectedForm.startsWith(f))) {
      setFormType(3);
      if (formType !== 3) setQuantity(100);
    } else {
      setFormType(4);
    }

    // 2. Dynamic Subtypes
    const newSubtypes = SUBTYPES_MAP[selectedForm] || DEFAULT_SUBTYPES;
    setCurrentSubtypes(newSubtypes);
    
    // Check if current selection is valid for new form, if not, reset to first
    const isValid = newSubtypes.some(s => s.name === selectedSubtype);
    if (!isValid) {
        setSelectedSubtype(newSubtypes[0].name);
    }

    // 3. Automatic Usage Type
    determineUsageType(selectedForm, ingredients);

  }, [selectedForm, ingredients]);

  const determineUsageType = (form: string, activeIngredients: Ingredient[]) => {
      // Explicit Lists for Detection
      const internalForms = [
          "CÁPSULAS", "COMPRIMIDOS", "PAPEL", "SACHÊS", "BALAS", 
          "STRIP", "SOLUÇÃO ORAL", "XAROPES", "SUSPENSÕES", "GOMAS"
      ];
      const externalForms = [
          "CREMES", "POMADAS", "GÉIS", "SOLUÇÃO EXTERNA", "SÉRUM", 
          "EMULSÃO", "TALCO", "LOÇÃO", "DESODORANTE", "SHAMPOO", 
          "CONDICIONADOR", "SABONETE", "ESMALTE", "AEROSSOL"
      ];

      // Step A: Check strictly by Form Name
      const isInternal = internalForms.some(t => form.includes(t));
      const isExternal = externalForms.some(t => form.includes(t));

      if (isInternal) {
          setUsageType('INTERNO');
          return;
      }
      
      if (isExternal) {
          setUsageType('EXTERNO');
          return;
      }

      // Step B: If Form is "OUTRAS" or Ambiguous, check Ingredients (Smart Logic)
      if (form === 'OUTRAS' || !isInternal && !isExternal) {
          // Keywords that suggest External usage
          const externalKeywords = ['MINOXIDIL', 'CÂNFORA', 'MENTOL', 'UREIA', 'ÁCIDO', 'HIDROQUINONA', 'CETOCONAZOL'];
          // Keywords that suggest Internal usage
          const internalKeywords = ['VITAMINA', 'IBUPROFENO', 'PARACETAMOL', 'DIPIRONA', 'OMEPRAZOL', 'MAGNÉSIO', 'ZINCO'];

          const hasExternalActive = activeIngredients.some(ing => externalKeywords.some(key => ing.name.includes(key)));
          const hasInternalActive = activeIngredients.some(ing => internalKeywords.some(key => ing.name.includes(key)));

          if (hasExternalActive && !hasInternalActive) {
              setUsageType('EXTERNO');
          } else if (hasInternalActive && !hasExternalActive) {
              setUsageType('INTERNO');
          } else {
              setUsageType('MISTO'); // Default if unknown or mixed
          }
      } else {
          setUsageType('MISTO');
      }
  };

  // Validate limits whenever amount or name changes
  useEffect(() => {
    if (!newIngName || !newIngAmount) {
        setValidationError(null);
        return;
    }

    const limits = INGREDIENT_LIMITS[newIngName];
    if (limits) {
        const val = parseFloat(newIngAmount);
        if (!isNaN(val)) {
            if (val < limits.min) {
                setValidationError('MIN');
            } else if (val > limits.max) {
                setValidationError('MAX');
            } else {
                setValidationError(null);
            }
        }
    } else {
        setValidationError(null);
    }
  }, [newIngAmount, newIngName]);


  // Handle Input Change for Autocomplete
  const handleNameChange = (text: string) => {
    const uppercaseText = text.toUpperCase();
    setNewIngName(uppercaseText);
    setNewIngAmount(''); // Reset amount on name change to force re-validation
    
    if (uppercaseText.length > 0) {
        const matches = INGREDIENT_DB.filter(ing => ing.includes(uppercaseText));
        setFilteredSuggestions(matches.slice(0, 5)); // Limit to 5 suggestions
    } else {
        setFilteredSuggestions([]);
    }
  };

  const selectSuggestion = (name: string) => {
      setNewIngName(name);
      // Auto-set unit if limit exists
      if (INGREDIENT_LIMITS[name]) {
          setNewIngUnit(INGREDIENT_LIMITS[name].unit);
      }
      setFilteredSuggestions([]);
  };

  // Perform the actual add logic
  const performAddIngredient = () => {
    const newIng: Ingredient = {
        id: Date.now(),
        name: newIngName.toUpperCase(),
        amount: parseFloat(newIngAmount),
        unit: newIngUnit
    };
    setIngredients([...ingredients, newIng]);
    setNewIngName('');
    setNewIngAmount('');
    setFilteredSuggestions([]);
    setStep('list');
  };

  // Intercept add action to show warning if needed
  const handleAddInteraction = () => {
    if (!newIngName || !newIngAmount) return;
    if (validationError) return; // Prevent adding if validation failed

    if (!hasShownWarning) {
        setShowWarningModal(true);
    } else {
        performAddIngredient();
    }
  };

  const handleRemoveIngredient = (id: number) => {
    setIngredients(ingredients.filter(i => i.id !== id));
  };

  // Logic for increasing quantity
  const handleIncreaseQuantity = () => {
    if (formType === 1) { // CAPS/UN
        if (quantity < 120) {
            setQuantity(prev => prev + 30);
        } else {
            setQuantity(prev => prev + 20);
        }
    } else {
        setQuantity(prev => prev + 10);
    }
  };

  // Logic for decreasing quantity
  const handleDecreaseQuantity = () => {
    if (formType === 1) { // CAPS/UN
        if (quantity > 120) {
            setQuantity(prev => prev - 20);
        } else if (quantity > 30) {
            setQuantity(prev => prev - 30);
        } else {
            setQuantity(30);
        }
    } else {
        setQuantity(prev => Math.max(1, prev - 10));
    }
  };

  const getUnitTooltip = (val: string) => {
      const u = UNIT_OPTIONS.find(o => o.value === val);
      return u ? { title: u.label, content: u.tooltip } : null;
  };

  // Handler for OCR Simulation
  const handleOCRScan = () => {
      if (ocrSuccess) {
          // Reset
          setOcrSuccess(false);
          setIngredients([]);
          return;
      }
      setIsScanning(true);
      setTimeout(() => {
          setIsScanning(false);
          setOcrSuccess(true);
          // Simulate Filling Data
          setSelectedForm("CÁPSULAS E/OU COMPRIMIDOS");
          setQuantity(60);
          setIngredients([
              { id: Date.now(), name: 'MINOXIDIL', amount: 2.5, unit: 'mg' },
              { id: Date.now() + 1, name: 'BIOTINA', amount: 5, unit: 'mg' }
          ]);
      }, 2500);
  };
  
  // OCR Disclaimer Modal
  const renderOcrDisclaimerModal = () => (
     <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative border border-gray-100 dark:border-slate-800">
            <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                </div>
                <div>
                    <h3 className="text-lg font-extrabold text-corporate dark:text-white uppercase mb-3 leading-tight">Foto da Receita</h3>
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/20">
                         <p className="text-xs font-bold text-gray-600 dark:text-gray-300 leading-relaxed uppercase">
                            A foto precisa estar clara e visível. Certifique-se de que todas as informações (nome do paciente, data, carimbo e assinatura) estejam legíveis para a validação do farmacêutico.
                        </p>
                    </div>
                </div>
                <div className="flex w-full gap-3 mt-2">
                    <button 
                        onClick={() => setShowOcrDisclaimer(false)}
                        className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-300 rounded-xl font-bold uppercase tracking-wide hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={() => {
                            setShowOcrDisclaimer(false);
                            handleOCRScan();
                        }}
                        className="flex-1 py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-wide shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors"
                    >
                        Anexar
                    </button>
                </div>
            </div>
        </div>
    </div>
  );

  // Warning Modal for Controlled Substances
  const renderWarningModal = () => (
     <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative border border-yellow-100 dark:border-yellow-900/30">
            <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-500 animate-pulse-slow">
                    <span className="material-symbols-outlined text-3xl">warning</span>
                </div>
                <div>
                    <h3 className="text-lg font-extrabold text-corporate dark:text-white uppercase mb-3 leading-tight">Atenção: Controlados</h3>
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-xl border border-yellow-100 dark:border-yellow-900/20">
                         <p className="text-xs font-bold text-gray-600 dark:text-gray-300 leading-relaxed uppercase">
                            No caso de matérias-primas controladas (as quais têm limite de prescrição), pedido acima da prescrição do receituário será cancelado automaticamente pelo estabelecimento farmacêutico.
                        </p>
                    </div>
                </div>
                <button 
                    onClick={() => {
                        setHasShownWarning(true);
                        setShowWarningModal(false);
                        performAddIngredient();
                    }}
                    className="w-full py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-wide shadow-lg shadow-primary/20 mt-2 hover:bg-primary-dark transition-colors"
                >
                    Entendi
                </button>
            </div>
        </div>
    </div>
  );

  // Render "Add Ingredient" Modal as an overlay
  const renderAddIngredientModal = () => {
    const limits = INGREDIENT_LIMITS[newIngName];

    return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/20 dark:bg-black/50 backdrop-blur-[2px]" onClick={() => setStep('list')}>
        <div 
            className="w-full h-[85vh] bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()} 
        >
            <div className="w-full flex justify-center pt-4 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-700 rounded-full"></div>
            </div>
            <div className="px-6 pt-2 pb-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-extrabold uppercase text-corporate dark:text-white">Adicionar Ativo</h3>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setTooltipModal({
                                    title: "ATIVO (MATÉRIA-PRIMA)",
                                    content: "É a substância química que exerce o efeito terapêutico ou nutricional. Ex: Vitamina C, Minoxidil, Colágeno."
                                });
                            }}
                            className="text-primary"
                        >
                            <span className="material-symbols-outlined">info</span>
                        </button>
                    </div>
                    <button onClick={() => setStep('list')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1">
                        <span className="material-symbols-outlined text-2xl">close</span>
                    </button>
                </div>
                
                <div className="space-y-6 relative">
                    {/* Ingredient Name Input & Autocomplete */}
                    <div className="relative z-20">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 block">Nome do Ativo</label>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                            <input 
                                value={newIngName}
                                onChange={(e) => handleNameChange(e.target.value)}
                                className="w-full py-4 pl-12 pr-4 bg-gray-100 dark:bg-slate-800 rounded-2xl border-none font-bold uppercase text-sm focus:ring-primary text-text-main dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500" 
                                placeholder="BUSCAR ATIVO..." 
                                autoFocus
                            />
                        </div>

                        {/* Autocomplete Dropdown */}
                        {filteredSuggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 max-h-48 overflow-y-auto z-30 animate-fade-in">
                                {filteredSuggestions.map((suggestion, index) => (
                                    <div 
                                        key={index}
                                        onClick={() => selectSuggestion(suggestion)}
                                        className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer border-b border-gray-50 dark:border-slate-700 last:border-none flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-gray-400 text-sm">science</span>
                                        <span className="text-sm font-bold text-text-main dark:text-white uppercase">{suggestion}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <div className="flex items-center gap-1 mb-2">
                                 <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase block">
                                    {formType === 2 ? 'Concentração' : 'Dosagem'}
                                 </label>
                                 <button onClick={(e) => {
                                    e.stopPropagation();
                                    setTooltipModal({
                                        title: formType === 2 ? 'CONCENTRAÇÃO' : 'DOSAGEM',
                                        content: formType === 2 
                                            ? "Quantidade do ativo em relação ao total (ex: 10% de ureia em 100g de creme significa 10g de ureia)."
                                            : "Quantidade exata do ativo por unidade (ex: 500mg por cápsula)."
                                    });
                                 }} className="text-gray-400 hover:text-primary">
                                    <span className="material-symbols-outlined text-sm">info</span>
                                 </button>
                             </div>
                             <input 
                                type="number"
                                value={newIngAmount}
                                onChange={(e) => setNewIngAmount(e.target.value)}
                                className={`w-full py-4 px-4 bg-gray-100 dark:bg-slate-800 rounded-2xl border-none font-bold uppercase text-xl text-center focus:ring-primary text-text-main dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${validationError ? 'ring-2 ring-red-500' : ''}`}
                                placeholder="0" 
                            />
                        </div>
                        
                        {/* Unit Selection with Dropdown */}
                        <div className="relative z-40"> 
                             <div className="flex items-center gap-1 mb-2">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase block">Unidade</label>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const t = getUnitTooltip(newIngUnit);
                                        if(t) setTooltipModal(t);
                                    }} 
                                    className="text-gray-400 hover:text-primary"
                                >
                                    <span className="material-symbols-outlined text-sm">info</span>
                                </button>
                             </div>
                             <div className="relative">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setUnitOpen(!unitOpen); }} 
                                    className="w-full h-[60px] px-4 bg-gray-100 dark:bg-slate-800 rounded-2xl flex items-center justify-between text-text-main dark:text-white font-bold text-sm uppercase focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary transition-all"
                                >
                                    <span className="flex-1 text-center">{newIngUnit}</span>
                                    <span className={`material-symbols-outlined text-primary transition-transform ${unitOpen ? 'rotate-180' : ''}`}>expand_more</span>
                                </button>
                                
                                {unitOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 max-h-48 overflow-y-auto z-50 animate-fade-in no-scrollbar">
                                        {UNIT_OPTIONS.map((u) => (
                                            <div 
                                                key={u.value}
                                                className={`w-full flex items-center hover:bg-gray-50 dark:hover:bg-slate-700 border-b border-gray-50 dark:border-slate-700 last:border-none transition-colors ${newIngUnit === u.value ? 'bg-primary/10 text-primary' : 'text-text-main dark:text-gray-200'}`}
                                            >
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setNewIngUnit(u.value); setUnitOpen(false); }}
                                                    className="flex-1 py-3 px-2 text-xs font-bold uppercase"
                                                >
                                                    {u.label}
                                                </button>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setTooltipModal({ title: u.label, content: u.tooltip });
                                                    }}
                                                    className="px-3 py-3 text-gray-400 hover:text-primary"
                                                >
                                                    <span className="material-symbols-outlined text-sm">info</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                             </div>
                        </div>
                    </div>

                    {/* Limit Validation Feedback */}
                    {limits ? (
                        <div className="mt-2 animate-fade-in">
                            {!validationError ? (
                                <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800/50 p-2 rounded-lg border border-gray-100 dark:border-slate-700">
                                    <span className="material-symbols-outlined text-gray-400 text-sm">verified_user</span>
                                    <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                                        Faixa Segura: {limits.min}{limits.unit} - {limits.max}{limits.unit}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 bg-red-50 dark:bg-red-900/10 p-2 rounded-lg border border-red-100 dark:border-red-900/30">
                                        <span className="material-symbols-outlined text-red-500 text-sm mt-0.5">error</span>
                                        <div>
                                            <p className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase">
                                                {validationError === 'MIN' ? `Mínimo exigido: ${limits.min}${limits.unit}` : `Máximo permitido: ${limits.max}${limits.unit}`}
                                            </p>
                                            <p className="text-[9px] font-medium text-red-400 dark:text-red-300 uppercase leading-tight mt-0.5">
                                                Valor fora da faixa de segurança padrão.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-2 bg-yellow-50 dark:bg-yellow-900/10 p-2 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                                        <span className="material-symbols-outlined text-yellow-600 text-sm mt-0.5">edit_note</span>
                                        <p className="text-[10px] font-bold text-yellow-700 dark:text-yellow-400 uppercase leading-tight">
                                            Para dosagens diferentes, descreva no campo "OBSERVAÇÕES" para avaliação farmacêutica.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : null}

                    <button 
                        onClick={handleAddInteraction}
                        disabled={!!validationError}
                        className={`w-full h-14 rounded-xl font-extrabold uppercase tracking-wide shadow-lg mt-4 transition-all ${
                            validationError 
                            ? 'bg-gray-300 dark:bg-slate-700 text-gray-500 cursor-not-allowed shadow-none' 
                            : 'bg-primary hover:bg-primary-dark text-white shadow-primary/20'
                        }`}
                    >
                        {validationError ? 'Valor Inválido' : 'Confirmar'}
                    </button>
                </div>
            </div>
            
            {/* Quick Suggestions - Expanded List */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3 no-scrollbar mt-2 border-t border-gray-100 dark:border-slate-800 pt-4">
                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase sticky top-0 bg-white dark:bg-slate-900 py-2">Sugestões Populares</h4>
                {POPULAR_SUGGESTIONS.map((item, i) => (
                    <div 
                        key={i} 
                        onClick={() => selectSuggestion(item.name.toUpperCase())} 
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-slate-700 transition-colors group"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold uppercase text-sm text-text-main dark:text-gray-200 group-hover:text-primary transition-colors">{item.name}</h4>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">{item.sub}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                             {item.desc && (
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setTooltipModal({ title: item.name, content: item.desc! });
                                    }}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:text-primary z-10"
                                >
                                    <span className="material-symbols-outlined text-lg">info</span>
                                </button>
                            )}
                            <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">
                                <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
  };

  // Render Form Selector Modal
  const renderFormSelector = () => (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end bg-black/20 dark:bg-black/50 backdrop-blur-[2px]" onClick={() => setFormOpen(false)}>
        <div 
            className="w-full h-[85vh] bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()} 
        >
            <div className="w-full flex justify-center pt-4 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-700 rounded-full"></div>
            </div>
            <div className="px-6 pt-2 pb-4 border-b border-gray-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-extrabold uppercase text-corporate dark:text-white">Forma Farmacêutica</h3>
                    <button onClick={() => setFormOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1">
                        <span className="material-symbols-outlined text-2xl">close</span>
                    </button>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3 no-scrollbar">
                {FORM_OPTIONS.map((option, idx) => (
                    <button 
                        key={idx}
                        onClick={() => {
                            setSelectedForm(option.name);
                            setFormOpen(false);
                            // Reset subtype when form changes
                            const subtypes = SUBTYPES_MAP[option.name] || DEFAULT_SUBTYPES;
                            setSelectedSubtype(subtypes[0].name);
                        }}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${selectedForm === option.name ? 'bg-primary/10 border-primary text-primary' : 'bg-gray-50 dark:bg-slate-800 border-transparent hover:border-gray-200 dark:hover:border-slate-700 text-gray-600 dark:text-gray-300'}`}
                    >
                        <span className="material-symbols-outlined text-3xl mb-2">{option.icon}</span>
                        <span className="text-xs font-bold uppercase text-center leading-tight">{option.name}</span>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setTooltipModal({ title: option.name, content: option.tooltip });
                            }}
                            className="mt-2 text-gray-400 hover:text-primary"
                        >
                            <span className="material-symbols-outlined text-sm">info</span>
                        </button>
                    </button>
                ))}
            </div>
        </div>
    </div>
  );

  // Render Subtype Selector Modal
  const renderSubtypeSelector = () => (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end bg-black/20 dark:bg-black/50 backdrop-blur-[2px]" onClick={() => setSubtypeOpen(false)}>
        <div 
            className="w-full max-h-[70vh] bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()} 
        >
            <div className="w-full flex justify-center pt-4 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-700 rounded-full"></div>
            </div>
             <div className="px-6 pt-2 pb-4 border-b border-gray-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-extrabold uppercase text-corporate dark:text-white">Selecione o Tipo</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Para {selectedForm}</p>
                    </div>
                    <button onClick={() => setSubtypeOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1">
                        <span className="material-symbols-outlined text-2xl">close</span>
                    </button>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
                {currentSubtypes.map((sub, idx) => (
                    <button 
                        key={idx}
                        onClick={() => {
                            setSelectedSubtype(sub.name);
                            setSubtypeOpen(false);
                        }}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${selectedSubtype === sub.name ? 'bg-primary/10 border-primary text-primary' : 'bg-gray-50 dark:bg-slate-800 border-transparent hover:border-gray-200 dark:hover:border-slate-700 text-gray-600 dark:text-gray-300'}`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedSubtype === sub.name ? 'bg-primary text-white' : 'bg-white dark:bg-slate-700 text-gray-400'}`}>
                            <span className="material-symbols-outlined text-xl">{sub.icon}</span>
                        </div>
                        <div className="flex-1 text-left">
                            <span className="text-xs font-bold uppercase block">{sub.name}</span>
                            <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase line-clamp-1">{sub.tooltip}</span>
                        </div>
                        {selectedSubtype === sub.name && <span className="material-symbols-outlined">check_circle</span>}
                    </button>
                ))}
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col relative transition-colors duration-300">
      {/* Modals are now conditional overlays */}
      {formOpen && renderFormSelector()}
      {subtypeOpen && renderSubtypeSelector()}
      {step === 'add' && renderAddIngredientModal()}
      {showWarningModal && renderWarningModal()}
      {showOcrDisclaimer && renderOcrDisclaimerModal()}

      {/* Tooltip Modal */}
      {tooltipModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-fade-in" onClick={() => setTooltipModal(null)}>
            <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative" onClick={e => e.stopPropagation()}>
                <button 
                    onClick={() => setTooltipModal(null)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-3xl">info</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-extrabold text-corporate dark:text-blue-300 uppercase mb-2 leading-tight">{tooltipModal.title}</h3>
                        <p className="text-sm font-bold text-gray-600 dark:text-gray-300 leading-relaxed uppercase">{tooltipModal.content}</p>
                    </div>
                    <button 
                        onClick={() => setTooltipModal(null)}
                        className="w-full py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-wide shadow-lg shadow-primary/20 mt-2"
                    >
                        Entendi
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-800">
        <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-corporate dark:text-white">
            <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-sm font-bold uppercase text-corporate dark:text-white">Calculadora Inteligente</h1>
        <button 
            onClick={() => setTooltipModal({
                title: "Como usar?",
                content: "Selecione a forma farmacêutica (ex: cápsula), adicione os ativos da receita e a quantidade. Nossa IA calculará o preço médio."
            })}
            className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-full text-corporate dark:text-gray-300"
        >
            <span className="material-symbols-outlined text-sm">help</span>
            <span className="text-[10px] font-bold">AJUDA</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
         
         {/* OCR / AI Scan Feature - Added at Top */}
         <div className="px-4 pt-4">
            <button 
                onClick={() => {
                    if(!ocrSuccess) setShowOcrDisclaimer(true);
                    else {
                        setOcrSuccess(false);
                        setIngredients([]);
                    }
                }}
                disabled={isScanning}
                className={`w-full relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 group
                    ${ocrSuccess 
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/10' 
                        : 'border-primary/30 bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/20'
                    }
                `}
            >
                {/* Background Shimmer when scanning */}
                {isScanning && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent skew-x-12 animate-shimmer"></div>
                )}

                <div className="p-4 flex flex-col items-center justify-center gap-2 min-h-[100px]">
                    {isScanning ? (
                        <>
                            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                            <span className="text-xs font-black text-primary uppercase animate-pulse">Lendo Receita com IA...</span>
                        </>
                    ) : ocrSuccess ? (
                        <>
                             <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 animate-scale-in">
                                <span className="material-symbols-outlined text-2xl">check</span>
                             </div>
                             <div className="text-center">
                                 <span className="text-sm font-black text-green-600 dark:text-green-500 uppercase block">Receita Identificada!</span>
                                 <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Toque para escanear novamente</span>
                             </div>
                        </>
                    ) : (
                        <>
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-2xl filled">add_a_photo</span>
                            </div>
                            <div className="text-center">
                                <span className="text-sm font-black text-primary uppercase block">Anexe sua receita aqui</span>
                                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Para leitura automática</span>
                            </div>
                        </>
                    )}
                </div>
            </button>
         </div>

         {/* Form Select Trigger */}
         <div className="px-4 py-4">
            <div className="flex items-center gap-1 mb-1">
                <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pl-1 block">Forma Farmacêutica</label>
                <button onClick={() => setTooltipModal({
                    title: "FORMA FARMACÊUTICA",
                    content: "É o estado final que o medicamento apresenta (Cápsula, Creme, Xarope, etc), facilitando sua administração e efeito."
                })} className="text-gray-400 hover:text-primary">
                    <span className="material-symbols-outlined text-sm">info</span>
                </button>
            </div>
            <button 
                onClick={() => setFormOpen(true)}
                className="w-full h-14 bg-blue-50 dark:bg-slate-800/50 rounded-xl flex items-center px-4 relative border border-transparent focus:border-primary mb-2"
            >
                <span className="material-symbols-outlined text-primary mr-3">medication_liquid</span>
                <span className="font-bold text-sm uppercase text-corporate dark:text-blue-300 line-clamp-1 text-left">{selectedForm}</span>
                <span className="material-symbols-outlined text-primary absolute right-4">expand_more</span>
            </button>

             {selectedForm === 'OUTRAS' && (
                <div className="animate-slide-down">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-wider pl-1 mb-1 block">ESPECIFIQUE A FORMA</label>
                    <input 
                        type="text"
                        value={customFormName}
                        onChange={(e) => setCustomFormName(e.target.value.toUpperCase())}
                        placeholder="DIGITE A FORMA FARMACÊUTICA..."
                        className="w-full h-12 px-4 rounded-xl border border-primary/30 bg-white dark:bg-slate-800 font-bold text-sm focus:ring-primary text-text-main dark:text-white placeholder:text-gray-300 uppercase"
                        autoFocus
                    />
                </div>
            )}
         </div>

         {/* NEW: Subtype Select Trigger */}
         <div className="px-4 pb-4">
            <div className="flex items-center gap-1 mb-1">
                <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pl-1 block">Subtipo</label>
                <button onClick={() => setTooltipModal({
                    title: "SUBTIPO",
                    content: "Especifique o tipo exato da cápsula ou comprimido (ex: Revestida, Sublingual) para maior precisão no orçamento e tratamento."
                })} className="text-gray-400 hover:text-primary">
                    <span className="material-symbols-outlined text-sm">info</span>
                </button>
            </div>
            <button 
                onClick={() => setSubtypeOpen(true)}
                className="w-full h-14 bg-blue-50 dark:bg-slate-800/50 rounded-xl flex items-center px-4 relative border border-transparent focus:border-primary mb-2"
            >
                <span className="material-symbols-outlined text-primary mr-3">style</span>
                <span className="font-bold text-sm uppercase text-corporate dark:text-blue-300 line-clamp-1 text-left">{selectedSubtype}</span>
                <span className="material-symbols-outlined text-primary absolute right-4">expand_more</span>
            </button>

             {(selectedSubtype.includes('OUTROS') || selectedSubtype.includes('EDITÁVEL')) && (
                <div className="animate-slide-down">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-wider pl-1 mb-1 block">ESPECIFIQUE O TIPO</label>
                    <input 
                        type="text"
                        value={customSubtypeName}
                        onChange={(e) => setCustomSubtypeName(e.target.value.toUpperCase())}
                        placeholder="DIGITE O TIPO..."
                        className="w-full h-12 px-4 rounded-xl border border-primary/30 bg-white dark:bg-slate-800 font-bold text-sm focus:ring-primary text-text-main dark:text-white placeholder:text-gray-300 uppercase"
                        autoFocus
                    />
                </div>
            )}
         </div>

         {/* Usage Type Selector - NEW DYNAMIC STATUS DASHBOARD */}
         <div className="px-4 pb-4">
             <div className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-4">
                 <div className="flex items-center justify-between mb-3">
                     <div className="flex items-center gap-1">
                        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase block">Via de Administração</label>
                        <button onClick={() => setTooltipModal({
                            title: "VIA DE ADMINISTRAÇÃO",
                            content: "Definida automaticamente pela IA com base na forma farmacêutica e ativos selecionados. (Interno = Ingerido / Externo = Pele)"
                        })} className="text-gray-400 hover:text-primary">
                            <span className="material-symbols-outlined text-sm">info</span>
                        </button>
                     </div>
                     <div className="bg-gray-200 dark:bg-slate-800 text-gray-500 dark:text-gray-400 text-[9px] px-1.5 py-0.5 rounded border border-gray-300 dark:border-slate-700 flex items-center gap-1 font-bold uppercase">
                        <span className="material-symbols-outlined text-[10px] filled">smart_toy</span>
                        Auto-Detectado
                     </div>
                 </div>

                 <div className="grid grid-cols-3 gap-2">
                    {/* INTERNO */}
                     <div className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 ${usageType === 'INTERNO' ? 'bg-green-500 text-white shadow-lg shadow-green-500/30 scale-[1.02]' : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-300 dark:text-gray-600 opacity-60'}`}>
                         <span className={`material-symbols-outlined text-xl ${usageType === 'INTERNO' ? 'filled' : ''}`}>local_drink</span>
                         <span className="text-[10px] font-black uppercase tracking-wider">Interno</span>
                         {usageType === 'INTERNO' && <span className="material-symbols-outlined text-[10px]">check_circle</span>}
                     </div>

                    {/* MISTO */}
                     <div className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 ${usageType === 'MISTO' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30 scale-[1.02] z-10' : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-300 dark:text-gray-600 opacity-60'}`}>
                         <span className={`material-symbols-outlined text-xl ${usageType === 'MISTO' ? 'filled' : ''}`}>science</span>
                         <span className="text-[10px] font-black uppercase tracking-wider">Misto</span>
                         {usageType === 'MISTO' && <span className="material-symbols-outlined text-[10px]">check_circle</span>}
                     </div>

                    {/* EXTERNO */}
                     <div className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 ${usageType === 'EXTERNO' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-[1.02]' : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-300 dark:text-gray-600 opacity-60'}`}>
                         <span className={`material-symbols-outlined text-xl ${usageType === 'EXTERNO' ? 'filled' : ''}`}>healing</span>
                         <span className="text-[10px] font-black uppercase tracking-wider">Externo</span>
                         {usageType === 'EXTERNO' && <span className="material-symbols-outlined text-[10px]">check_circle</span>}
                     </div>
                 </div>
                 
                 <div className="mt-3 flex items-center gap-2 justify-center text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">
                     <span className="material-symbols-outlined text-xs">lock</span>
                     <span>Seleção automática por segurança</span>
                 </div>
             </div>
         </div>

         {/* Ingredients List */}
         <div className="px-4 space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                    <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pl-1">Ativos da Fórmula</label>
                    <button onClick={() => setTooltipModal({
                        title: "ATIVOS",
                        content: "São os ingredientes medicinais descritos na sua receita. Adicione um por um."
                    })} className="text-gray-400 hover:text-primary">
                        <span className="material-symbols-outlined text-sm">info</span>
                    </button>
                </div>
                <button onClick={() => setStep('add')} className="text-[10px] font-bold text-primary flex items-center gap-1 uppercase">
                    <span className="material-symbols-outlined text-sm">add_circle</span>
                    Adicionar Ativo
                </button>
            </div>

            {ingredients.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-gray-200 dark:border-slate-700">
                    <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 text-4xl">science</span>
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mt-2 uppercase">Adicione matérias-primas<br/>para calcular</p>
                </div>
            ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {ingredients.map((ing) => (
                        <div key={ing.id} className="bg-gray-50 dark:bg-slate-900 rounded-xl p-3 border border-gray-100 dark:border-slate-800 flex gap-2 relative group transition-colors">
                            <div className="flex-1">
                                <label className="text-[8px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-1 block">Nome do Ativo</label>
                                <input 
                                    type="text" 
                                    value={ing.name} 
                                    onChange={(e) => {
                                        const newIngs = ingredients.map(i => i.id === ing.id ? {...i, name: e.target.value.toUpperCase()} : i);
                                        setIngredients(newIngs);
                                    }}
                                    className="w-full rounded-lg border-none bg-white dark:bg-slate-800 text-xs font-bold px-3 py-2 focus:ring-1 focus:ring-primary uppercase text-text-main dark:text-white" 
                                />
                            </div>
                            <div className="w-[120px]">
                                <label className="text-[8px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-1 block">
                                    {formType === 2 ? 'Conc./%' : 'Dose'}
                                </label>
                                <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-lg focus-within:ring-1 focus-within:ring-primary overflow-hidden">
                                    <input 
                                        type="number" 
                                        value={ing.amount} 
                                        onChange={(e) => {
                                            const newIngs = ingredients.map(i => i.id === ing.id ? {...i, amount: parseFloat(e.target.value)} : i);
                                            setIngredients(newIngs);
                                        }}
                                        className="w-full min-w-0 rounded-none border-none bg-transparent text-xs font-bold px-2 py-2 focus:ring-0 text-text-main dark:text-white" 
                                    />
                                    <div className="relative flex items-center bg-gray-100 dark:bg-slate-700 h-full">
                                        <select 
                                            value={ing.unit}
                                            onChange={(e) => {
                                                const newIngs = ingredients.map(i => i.id === ing.id ? {...i, unit: e.target.value} : i);
                                                setIngredients(newIngs);
                                            }}
                                            className="appearance-none bg-transparent border-none text-[10px] font-black text-primary focus:ring-0 cursor-pointer pr-5 py-2 pl-2 h-full"
                                        >
                                            {UNIT_OPTIONS.map(u => (
                                                <option key={u.value} value={u.value}>{u.value}</option>
                                            ))}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-1 top-1/2 -translate-y-1/2 text-[12px] text-primary pointer-events-none">expand_more</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-end pb-1">
                                <button 
                                    onClick={() => handleRemoveIngredient(ing.id)}
                                    className="text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 p-1"
                                >
                                    <span className="material-symbols-outlined text-base">delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
         </div>

         {/* Total Section (Dynamic based on Form Type) */}
         <div className="px-4 mt-6">
            <div className="bg-background-dark dark:bg-blue-900/40 rounded-2xl p-6 text-white text-center shadow-xl dark:shadow-blue-900/20 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary text-xl">
                            {formType === 1 ? 'pill' : 'scale'}
                        </span>
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] font-black uppercase tracking-widest">
                                {formType === 1 ? 'Quantidade do Pedido' : 'Volume Total (Q.S.P.)'}
                            </span>
                            <button onClick={() => setTooltipModal({
                                title: formType === 1 ? 'QUANTIDADE' : 'Q.S.P. (QUANTIDADE SUFICIENTE PARA)',
                                content: formType === 1 
                                    ? "O número total de cápsulas, sachês ou unidades que você deseja manipular."
                                    : "Significa 'Quantidade Suficiente Para'. É o peso ou volume final total do pote/frasco (ex: 100g de creme)."
                            })} className="text-white/60 hover:text-white">
                                <span className="material-symbols-outlined text-sm">info</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Editable Quantity/Volume */}
                    <div className="flex items-center justify-center gap-4 border-b border-white/20 pb-4 mb-2 w-full max-w-[200px] mx-auto">
                        <button 
                            onClick={handleDecreaseQuantity}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                        >
                            <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        
                        <div className="flex items-baseline gap-1">
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                                className="text-4xl font-black bg-transparent text-white text-center w-24 focus:outline-none appearance-none p-0 border-none"
                            />
                            <span className="text-xs font-bold text-primary uppercase">
                                {formType === 1 ? 'Caps/Un' : (formType === 2 ? (selectedForm.includes('SOLUÇÃO') ? 'ML' : 'Gramas') : 'ML')}
                            </span>
                        </div>

                        <button 
                             onClick={handleIncreaseQuantity}
                             className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                        >
                            <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                    </div>

                    {formType === 2 && (
                         <div className="bg-white/10 rounded-lg p-2 inline-block">
                             <p className="text-[8px] font-bold uppercase opacity-80 mb-0.5">Veículo Q.S.P.</p>
                             <p className="text-xs font-bold uppercase">{selectedForm.split(' ')[0]}</p>
                         </div>
                    )}
                    
                    {formType === 1 && (
                        <p className="text-[8px] font-bold uppercase mt-2 opacity-60">Total de unidades a manipular</p>
                    )}
                </div>
                
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <span className="material-symbols-outlined text-9xl">science</span>
                </div>
            </div>
         </div>

         {/* Observation Field */}
         <div className="px-4 mt-6">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pl-1 mb-2 block">
                Observações
            </label>
            <textarea 
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="DIGITE INFORMAÇÕES ADICIONAIS..."
                className="w-full h-24 p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-xs font-bold uppercase text-text-main dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary resize-none transition-colors"
            />
         </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
        <button 
            onClick={onProceed}
            className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-xl font-extrabold uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg"
        >
            <span className="material-symbols-outlined">calculate</span>
            Calcular Fórmula
        </button>
      </div>
    </div>
  );
}