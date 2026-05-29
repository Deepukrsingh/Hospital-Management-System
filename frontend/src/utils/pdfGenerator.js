import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePrescriptionPDF = (appointment) => {
  const doc = new jsPDF();
  
  // Colors and styling
  const primaryColor = [20, 184, 166]; // Teal-500
  const textColor = [51, 65, 85]; // Slate-700
  
  // Header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Medicure Hospital', 15, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('A Premium Healthcare Service', 15, 32);
  
  // Doctor Info (Top Right)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  const docName = `Dr. ${appointment.doctorInfo?.name || 'Unknown'}`;
  doc.text(docName, 195, 20, { align: 'right' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${appointment.doctorInfo?.specialization || 'General'}`, 195, 26, { align: 'right' });
  doc.text(`${appointment.doctorInfo?.email || ''}`, 195, 32, { align: 'right' });
  
  // Reset text color
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  
  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Medical Prescription', 105, 55, { align: 'center' });
  
  // Patient & Appointment Details
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Patient Name: ${appointment.userInfo?.name || 'Unknown'}`, 15, 70);
  doc.text(`Patient Email: ${appointment.userInfo?.email || 'N/A'}`, 15, 78);
  
  doc.text(`Date: ${appointment.date}`, 195, 70, { align: 'right' });
  doc.text(`Time: ${appointment.time}`, 195, 78, { align: 'right' });
  
  const issuedDate = appointment.prescription?.issuedAt 
    ? new Date(appointment.prescription.issuedAt).toLocaleDateString() 
    : new Date().toLocaleDateString();
  doc.text(`Issued On: ${issuedDate}`, 195, 86, { align: 'right' });
  
  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(15, 92, 195, 92);
  
  // Medicines Table
  if (appointment.prescription?.medicines && appointment.prescription.medicines.length > 0) {
    const tableData = appointment.prescription.medicines.map((med, index) => [
      index + 1,
      med.name,
      med.dosage,
      med.duration,
      med.instructions
    ]);
    
    autoTable(doc, {
      startY: 100,
      head: [['#', 'Medicine Name', 'Dosage', 'Duration', 'Instructions']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: 255,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 10,
        cellPadding: 5
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252] // Slate-50
      }
    });
  } else {
    doc.setFont('helvetica', 'italic');
    doc.text('No medicines prescribed.', 15, 105);
  }
  
  // Notes
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : 120;
  
  if (appointment.prescription?.notes) {
    doc.setFont('helvetica', 'bold');
    doc.text('Doctor\'s Notes:', 15, finalY);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    // Split text to fit width
    const splitNotes = doc.splitTextToSize(appointment.prescription.notes, 180);
    doc.text(splitNotes, 15, finalY + 8);
  }
  
  // Footer
  const footerY = 280;
  doc.setDrawColor(200, 200, 200);
  doc.line(15, footerY - 10, 195, footerY - 10);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('This is an electronically generated prescription and does not require a physical signature.', 105, footerY, { align: 'center' });
  
  // Save PDF
  doc.save(`Prescription_${appointment.userInfo?.name || 'Patient'}_${appointment.date}.pdf`);
};
