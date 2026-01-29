
export interface Doctor {
  name: string;
  specialty: string;
  type: 'Regular OPD' | 'Super Specialist';
  timing?: string;
  days: string;
  charges?: string;
  imageColor: string;
}

export const DOCTORS_DATA: Doctor[] = [
  // Regular OPD
  { name: 'Dr. Sanjeev Sehgal', specialty: 'Eye Consultant', type: 'Regular OPD', days: 'Daily', timing: '10:00 AM - 1:00 PM', imageColor: 'bg-blue-100 text-blue-600' },
  { name: 'Dr. Amit Mangla', specialty: 'ENT / Microbiologist', type: 'Regular OPD', days: 'Daily', timing: '9:30 AM - 4:00 PM', imageColor: 'bg-emerald-100 text-emerald-600' },
  { name: 'Dr. Rahul Sharma', specialty: 'General Surgeon', type: 'Regular OPD', days: 'Daily', timing: '9:30 AM - 4:00 PM', imageColor: 'bg-indigo-100 text-indigo-600' },
  { name: 'Dr. Rajesh Kumar Tayal', specialty: 'Orthopedic Specialist', type: 'Regular OPD', days: 'Daily', timing: '9:30 AM - 4:00 PM', imageColor: 'bg-amber-100 text-amber-600' },
  { name: 'Dr. Rajat Mangla', specialty: 'Anaesthetist', type: 'Regular OPD', days: 'Daily', timing: '9:30 AM - 4:00 PM', imageColor: 'bg-purple-100 text-purple-600' },
  { name: 'Dr. Shalinee Mangla', specialty: 'Pediatrician', type: 'Regular OPD', days: 'Daily', timing: '9:30 AM - 4:00 PM', imageColor: 'bg-pink-100 text-pink-600' },
  { name: 'Dr. Romani Bansal', specialty: 'Pediatrician', type: 'Regular OPD', days: 'Daily', timing: '9:30 AM - 4:00 PM', imageColor: 'bg-rose-100 text-rose-600' },
  { name: 'Dr. Roushali Kumar', specialty: 'Obstetrics & Gynecology', type: 'Regular OPD', days: 'Daily', timing: '9:30 AM - 4:00 PM', imageColor: 'bg-fuchsia-100 text-fuchsia-600' },
  { name: 'Dr. Neha', specialty: 'Pedodentist', type: 'Regular OPD', days: 'Tuesday & Friday', timing: '10:00 AM - 4:00 PM', imageColor: 'bg-rose-100 text-rose-600' },
  { name: 'Dr. Vivek Srivastava', specialty: 'General Medicine', type: 'Regular OPD', days: 'Daily', timing: '9:30 AM - 4:00 PM', imageColor: 'bg-cyan-100 text-cyan-600' },
  { name: 'Dr. Ashima', specialty: 'Dental Specialist', type: 'Regular OPD', days: 'Daily', timing: '9:30 AM - 4:00 PM', imageColor: 'bg-teal-100 text-teal-600' },
  { name: 'Dr. Kamakshi', specialty: 'Physiotherapist / Dietitian', type: 'Regular OPD', days: 'Daily', timing: '9:30 AM - 1:00 PM', imageColor: 'bg-lime-100 text-lime-600' },
  { name: 'Dr. Vijay Dhiman', specialty: 'Physiotherapist', type: 'Regular OPD', days: 'Daily', timing: '2:00 PM - 4:00 PM', imageColor: 'bg-green-100 text-green-600' },

  // Super Specialists
  { name: 'Dr. Rohit Dhadwal', specialty: 'Urologist (From Fortis Hospital, Mohali)', type: 'Super Specialist', days: 'Every 1st Wednesday', timing: '10:00 AM – 2:00 PM', charges: '₹400', imageColor: 'bg-violet-100 text-violet-600' },
  { name: 'Dr. Mohit Kaushal', specialty: 'Pulmonologist (From Fortis Hospital, Mohali)', type: 'Super Specialist', days: 'Every 2nd Wednesday', timing: '11:00 AM – 1:00 PM', charges: '₹400', imageColor: 'bg-sky-100 text-sky-600' },
  { name: 'Dr. Anil Walia', specialty: 'Cosmetologist', type: 'Super Specialist', days: 'Every Saturday', timing: '10:00 AM – 2:00 PM', charges: '₹100', imageColor: 'bg-orange-100 text-orange-600' },
  { name: 'Dr. Sudhanshu Budakoti', specialty: 'Cardiologist (From Fortis Hospital, Mohali)', type: 'Super Specialist', days: 'Every 3rd Friday', timing: '11:00 AM – 2:00 PM', charges: '₹400', imageColor: 'bg-red-100 text-red-600' },
  { name: 'Dr. Deepti Singh', specialty: 'Breast & Endocrine Surgeon (From Fortis Hospital, Mohali)', type: 'Super Specialist', days: 'Every 2nd Tuesday', charges: '₹400', imageColor: 'bg-pink-100 text-pink-600' },
  { name: 'Dr. Mahindra Dange', specialty: 'Pediatric Surgeon', type: 'Super Specialist', days: 'Every 4th Tuesday', timing: '10:00 AM – 2:00 PM', charges: '₹400', imageColor: 'bg-blue-100 text-blue-600' },
  { name: 'Dr. Nishit Sawal', specialty: 'Neurologist (From Fortis Hospital, Mohali)', type: 'Super Specialist', days: 'Every 1st & 3rd Tuesday', timing: '11:00 AM – 2:00 PM', charges: '₹500', imageColor: 'bg-indigo-100 text-indigo-600' },
  { name: 'Dr. Yogesh Jindal', specialty: 'Neuro Surgeon', type: 'Super Specialist', days: 'Every 2nd & 4th Thursday', timing: '11:00 AM – 2:00 PM', charges: '₹400', imageColor: 'bg-slate-100 text-slate-600' },
  { name: 'Dr. Kalpesh', specialty: 'Nephrologist', type: 'Super Specialist', days: 'Every 1st Wednesday', timing: '10:00 AM – 2:00 PM', charges: '₹400', imageColor: 'bg-cyan-100 text-cyan-600' },
];
