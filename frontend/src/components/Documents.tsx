import axios from "axios";
import { useState, useEffect } from 'react';
import { ArrowLeft, Upload, FileText, Download, Trash2, Eye, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { auth } from "../firebaseConfig";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  category: 'medicine' | 'report' | 'prescription' | 'other';
  preview?: string;
}

interface DocumentsProps {
  onBack: () => void;
}

const API = "http://localhost:8080/api/documents";


export function Documents({ onBack }: DocumentsProps) {
 

  const [documents, setDocuments] = useState<Document[]>([]);

useEffect(() => {
  fetchDocuments();
}, []);

const fetchDocuments = async () => {
  try {
    // const res = await axios.get(`${API}`);
    // const token = await auth.currentUser?.getIdToken();
    const token = localStorage.getItem("token");


const res = await axios.get(`${API}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

    setDocuments(res.data);
  } catch (err) {
    console.error("Error fetching documents", err);
  }
};

  
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);
  const [previewDialog, setPreviewDialog] = useState<Document | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

 
const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  const file = files[0];

  // ✅ Get Firebase Token
  // const token = await auth.currentUser?.getIdToken();
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("User not logged in. No token available.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post(`${API}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,   // ✅ CRITICAL
      },
    });

    setDocuments((prev) => [res.data, ...prev]);
    setUploadDialogOpen(false);
  } catch (err) {
    console.error("Upload error:", err);
  }

  e.target.value = "";
};



 

const handleDelete = async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`${API}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // remove from UI
    setDocuments(docs => docs.filter(doc => doc.id !== id));
    setDeleteDialog(null);

  } catch (err) {
    console.error("Delete failed", err);
  }
};



 

const handleDownload = async (doc: Document) => {
  try {
   
    const token = localStorage.getItem("token");


const res = await axios.get(`${API}/${doc.id}/view`, {
  responseType: "blob",
  headers: { Authorization: `Bearer ${token}` },
});


    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = doc.name;
    link.click();
  } catch (err) {
    console.error("Download error:", err);
  }
};



const handleView = async (doc: Document) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API}/${doc.id}/view`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const blob = new Blob([res.data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(blob);

    setPreviewDialog({
      id: doc.id,
      name: doc.name,
      preview: fileURL   // <-- THIS IS WHAT IFRAME NEEDS
    });

  } catch (err) {
    console.error("View error:", err);
  }
};






  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medicine':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300';
      case 'report':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      case 'prescription':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl text-gray-900 dark:text-white">My Documents</h1>
          </div>
          
          <Button
            onClick={() => setUploadDialogOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="text-3xl text-blue-600 dark:text-blue-400 mb-2">{documents.length}</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Documents</p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="text-3xl text-emerald-600 dark:text-emerald-400 mb-2">
                {documents.filter(d => d.category === 'medicine').length}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Medicine</p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="text-3xl text-orange-600 dark:text-orange-400 mb-2">
                {documents.filter(d => d.category === 'report').length}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Reports</p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="text-3xl text-purple-600 dark:text-purple-400 mb-2">
                {documents.filter(d => d.category === 'prescription').length}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Prescriptions</p>
            </Card>
          </div>

          {/* Documents List */}
          <div className="space-y-4">
            {documents.length === 0 ? (
              <Card className="p-12 text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl text-gray-900 dark:text-white mb-2">No Documents Yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Upload your first medical document to get started
                </p>
                <Button
                  onClick={() => setUploadDialogOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </Card>
            ) : (
              documents.map((doc) => (
                <Card key={doc.id} className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg text-gray-900 dark:text-white mb-1 truncate">
                        {doc.name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span>{doc.size} MB</span>
                        <span>•</span>
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Badge className={getCategoryColor(doc.category)}>
                      {doc.category.charAt(0).toUpperCase() + doc.category.slice(1)}
                    </Badge>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        //onClick={() => setPreviewDialog(doc)}
                        onClick={() => handleView(doc)}
                        className="border-gray-300 dark:border-gray-600"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDownload(doc)}
                        className="border-gray-300 dark:border-gray-600"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setDeleteDialog(doc.id)}
                        className="border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800" aria-describedby="upload-description">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Upload Document</DialogTitle>
          </DialogHeader>
          <div id="upload-description" className="py-6">
            <label 
              htmlFor="file-upload" 
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-700 dark:text-gray-300 mb-2">Click to upload document</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">PDF, JPG, PNG up to 10MB</p>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </DialogContent>
      </Dialog>

{/* Preview Dialog */}
<Dialog open={!!previewDialog} onOpenChange={() => setPreviewDialog(null)}>
  <DialogContent className="w-[95vw] h-[95vh] max-w-none bg-white dark:bg-gray-800 p-6 rounded-lg">
    <DialogHeader>
      <DialogTitle className="text-gray-900 dark:text-white">
        {previewDialog?.name}
      </DialogTitle>
    </DialogHeader>

    <div className="w-full h-full mt-4">
      {previewDialog?.preview ? (
        <iframe
          src={previewDialog.preview}
          className="w-full h-full rounded-lg border"
        />
      ) : (
        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-12 text-center">
          <FileText className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Preview not available</p>
        </div>
      )}
    </div>
  </DialogContent>
</Dialog>


      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <AlertDialogContent className="bg-white dark:bg-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-white">Delete Document</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              Are you sure you want to delete this document? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteDialog && handleDelete(deleteDialog)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
