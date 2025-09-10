export const MATERIAL_CATEGORIES = [
  { id: 'end_use', name: 'End-Use Parts' },
  { id: 'prototyping', name: 'Rapid Prototyping' },
  { id: 'tooling', name: 'Tooling & Fixtures' },
  { id: 'clarity', name: 'Clear/Visual' },
  { id: 'elastomers', name: 'Elastomers' },
];
export const MATERIALS = [
  { id:'rigid10k', name:'Rigid 10K', uses:['end_use','tooling'], props:['Very stiff','Heat resistant'], desc:'Ceramic-filled for high stiffness and dimensional stability.' },
  { id:'tough1500', name:'Tough 1500', uses:['end_use','prototyping','tooling'], props:['Impact resistant','Snap-fit capable'], desc:'Functional prototypes and light-duty fixtures.' },
  { id:'high_temp', name:'High Temp', uses:['end_use','tooling'], props:['Heat deflection','Thermal testing'], desc:'Hot-air, fluid, or autoclave-adjacent components.' },
  { id:'esd', name:'ESD Resin', uses:['end_use','electronics'], props:['Static dissipative'], desc:'Safe handling around sensitive electronics; jigs and trays.' },
  { id:'durable', name:'Durable', uses:['prototyping','end_use'], props:['Wear resistant','Low friction'], desc:'Clips, bushings, low-friction features.' },
  { id:'clear', name:'Clear', uses:['clarity','prototyping'], props:['Optical clarity'], desc:'Visual prototypes, light pipes, and fluidic observation.' },
  { id:'black', name:'Black', uses:['prototyping'], props:['General purpose'], desc:'Smooth cosmetic models.' },
  { id:'grey', name:'Grey', uses:['prototyping'], props:['Detail'], desc:'Neutral color that photographs well.' },
  { id:'elastic50a', name:'Elastic 50A', uses:['elastomers','prototyping'], props:['Very soft','Bendable'], desc:'Soft overmold-like parts, seals, and cushioning.' },
  { id:'flex80a', name:'Flexible 80A', uses:['elastomers','end_use'], props:['Rubber-like','Durable'], desc:'Handles, grips, and gaskets.' },
];