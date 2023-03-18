// utils/generatePdf.js
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const generatePdf = async (element, fileName = 'order_summary.pdf') => {
  // Convert the HTML element to a canvas
  const canvas = await html2canvas(element, { scale: 2 })

  // Initialize a new jsPDF instance
  const pdf = new jsPDF('p', 'mm', 'a4')

  // Calculate the aspect ratio
  const aspectRatio = canvas.width / canvas.height

  // Calculate the dimensions of the image to fit within the PDF
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const imgWidth = pageWidth - 20
  const imgHeight = imgWidth / aspectRatio

  // Add the image to the PDF
  const dataURL = canvas.toDataURL('image/jpeg', 1.0)
  pdf.addImage(dataURL, 'JPEG', 10, 10, imgWidth, imgHeight)

  // Save the PDF
  pdf.save(fileName)
}

export { generatePdf }
