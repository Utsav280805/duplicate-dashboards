
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Search,
  FileText,
  BookOpen,
  MessageSquare,
  Mail,
  ChevronRight,
} from "lucide-react";

const Help = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const faqs = [
    {
      question: "What is a duplicate record?",
      answer:
        "A duplicate record occurs when the same information exists in multiple entries in your database. This can happen due to manual data entry errors, multiple imports, or when different systems collect the same information. Our system uses advanced algorithms to detect potential duplicates based on configurable matching criteria.",
    },
    {
      question: "How does the duplicate detection work?",
      answer:
        "Our duplicate detection engine compares records using a combination of exact matching, fuzzy matching, and phonetic algorithms. You can configure which fields to compare, the match threshold, and other settings to fine-tune the detection process. When potential duplicates are found, they're presented for review so you can decide whether to merge, delete, or keep them separate.",
    },
    {
      question: "Can I import data from Excel or CSV files?",
      answer:
        "Yes! You can import data from Excel spreadsheets (.xlsx, .xls) and CSV files. Our system will analyze the imported data against your existing records to identify potential duplicates. You can configure how these duplicates are handled during the import process - either flagging them for review, skipping them, or automatically merging them based on your settings.",
    },
    {
      question: "How do I merge duplicate records?",
      answer:
        "When viewing potential duplicates in the Duplicate Detection page, you can compare records side by side. The system highlights differences between records to help you make decisions. You can choose to merge records, keeping the most accurate data from each record, or mark them as 'Not Duplicates' if they should remain separate. The merge process combines the records into a single entry while maintaining an audit trail.",
    },
    {
      question: "Is there a limit to how many records I can manage?",
      answer:
        "The system is designed to handle large datasets efficiently. Standard accounts can manage up to 50,000 records, while premium accounts have higher or unlimited record allowances. For extremely large datasets, we recommend using batch imports and processing to ensure optimal performance.",
    },
    {
      question: "Can I customize the duplicate detection rules?",
      answer:
        "Absolutely! In the Settings page, you can customize the matching criteria, including which fields to compare, match threshold sensitivity, and whether to use exact or fuzzy matching. You can also create field-specific rules, such as ignoring case differences or considering phone numbers with different formats as matches.",
    },
  ];

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(
    (faq) =>
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">How Can We Help?</h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Find answers to common questions or contact our support team.
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                className="pl-12 h-14 rounded-full text-slate-900 bg-white border-transparent shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Quick Help Categories</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Browse through our resources to find the answers you need.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center hover:shadow-md transition-shadow">
                <FileText className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Documentation</h3>
                <p className="text-slate-600 mb-4">
                  Detailed guides on how to use all features of the system.
                </p>
                <Button variant="link" className="text-blue-600 inline-flex items-center">
                  View Documentation
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center hover:shadow-md transition-shadow">
                <BookOpen className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Tutorials</h3>
                <p className="text-slate-600 mb-4">
                  Step-by-step walkthroughs for common tasks and workflows.
                </p>
                <Button variant="link" className="text-blue-600 inline-flex items-center">
                  Watch Tutorials
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center hover:shadow-md transition-shadow">
                <MessageSquare className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-slate-600 mb-4">
                  Join discussions and get help from other users.
                </p>
                <Button variant="link" className="text-blue-600 inline-flex items-center">
                  Visit Community
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Find quick answers to common questions about our duplicate detection system.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="bg-white rounded-xl border border-slate-100 shadow-sm">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 text-left">
                      <div className="flex items-center">
                        <HelpCircle className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2">
                      <div className="pl-8 text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <div className="py-10 text-center text-slate-500">
                  <HelpCircle className="h-10 w-10 mx-auto mb-3 text-slate-400" />
                  <p>No FAQs matching your search</p>
                  <p className="text-sm mt-1">Try another search term or browse the categories</p>
                </div>
              )}
            </Accordion>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our support team is here to assist you with any questions or issues.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-600" />
                  Contact Support
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      value={contactForm.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      value={contactForm.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help?"
                      required
                      value={contactForm.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your issue or question in detail..."
                      rows={5}
                      required
                      value={contactForm.message}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-xl font-semibold mb-4">Support Options</h3>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Email Support</h4>
                      <p className="text-slate-600 mb-1">For general inquiries and non-urgent issues</p>
                      <a
                        href="mailto:support@ddas.com"
                        className="text-blue-600 hover:text-blue-500 font-medium"
                      >
                        support@ddas.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Live Chat</h4>
                      <p className="text-slate-600 mb-1">Available Monday-Friday, 9am-5pm EST</p>
                      <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-500 font-medium">
                        Start Chat
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-200 pt-6 mt-6">
                    <h4 className="text-lg font-medium mb-4">Response Times</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-500 mr-2 mt-0.5"></div>
                        <span>Email Support: Within 24 hours</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-500 mr-2 mt-0.5"></div>
                        <span>Live Chat: Immediate (during business hours)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-amber-500 mr-2 mt-0.5"></div>
                        <span>Complex Technical Issues: 1-2 business days</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
