import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Star, Send, Brain, Shield, Target, CheckCircle } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { Card } from "@/react-app/components/ui/card";
import { Input } from "@/react-app/components/ui/input";
import { Textarea } from "@/react-app/components/ui/textarea";
import { Label } from "@/react-app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/react-app/components/ui/select";
import Navbar from "@/react-app/components/Navbar";
import PageTransition from "@/react-app/components/PageTransition";
import ScrollReveal from "@/react-app/components/ScrollReveal";
import { cn } from "@/react-app/lib/utils";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [safetyExperience, setSafetyExperience] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form fields
  const [role, setRole] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [issueCategory, setIssueCategory] = useState("");
  const [feedback, setFeedback] = useState("");
  
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!role) {
      newErrors.role = "Please select your role";
    }
    if (!sessionId.trim()) {
      newErrors.sessionId = "Please enter a session or machine ID";
    }
    if (rating === 0) {
      newErrors.rating = "Please rate your experience";
    }
    if (!issueCategory) {
      newErrors.issueCategory = "Please select an issue category";
    }
    if (!feedback.trim()) {
      newErrors.feedback = "Please provide detailed feedback";
    }
    if (!safetyExperience) {
      newErrors.safetyExperience = "Please select a safety experience option";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitted(true);
    // Reset form
    setRole("");
    setSessionId("");
    setRating(0);
    setIssueCategory("");
    setFeedback("");
    setSafetyExperience(null);
    setErrors({});
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        
        {/* Header */}
        <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4"
            >
              <MessageSquare className="w-7 h-7 text-white" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3"
            >
              Share Your Feedback
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              Help us improve the CNC AI Health Monitoring System by sharing your experience
            </motion.p>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Feedback Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Card className="p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300">
                    <AnimatePresence mode="wait">
                      {isSubmitted ? (
                        <motion.div 
                          key="success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="text-center py-12"
                        >
                          <motion.div 
                            className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 10, stiffness: 200 }}
                          >
                            <CheckCircle className="w-8 h-8 text-green-600" />
                          </motion.div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                          <p className="text-gray-600">Your feedback has been submitted successfully.</p>
                        </motion.div>
                      ) : (
                        <motion.form 
                          key="form"
                          onSubmit={handleSubmit} 
                          className="space-y-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {/* User Details */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Details</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                              >
                                <Label htmlFor="name">Name (Optional)</Label>
                                <Input id="name" placeholder="Your name" className="mt-1.5 transition-all duration-200 focus:ring-2 focus:ring-primary/20" />
                              </motion.div>
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 }}
                              >
                                <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
                                <Select value={role} onValueChange={(value) => { setRole(value); setErrors(prev => ({ ...prev, role: "" })); }}>
                                  <SelectTrigger className={cn("mt-1.5 transition-all duration-200", errors.role && "border-red-500")}>
                                    <SelectValue placeholder="Select your role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="trainer">Trainer</SelectItem>
                                    <SelectItem value="technician">Technician</SelectItem>
                                  </SelectContent>
                                </Select>
                                <AnimatePresence>
                                  {errors.role && (
                                    <motion.p 
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      className="text-red-500 text-sm mt-1"
                                    >
                                      {errors.role}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            </div>
                            <motion.div 
                              className="mt-4"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <Label htmlFor="session">Session or Machine ID <span className="text-red-500">*</span></Label>
                              <Input 
                                id="session" 
                                placeholder="e.g., CNC-001 or Session-2024-001" 
                                className={cn("mt-1.5 transition-all duration-200 focus:ring-2 focus:ring-primary/20", errors.sessionId && "border-red-500")}
                                value={sessionId}
                                onChange={(e) => { setSessionId(e.target.value); setErrors(prev => ({ ...prev, sessionId: "" })); }}
                              />
                              <AnimatePresence>
                                {errors.sessionId && (
                                  <motion.p 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-red-500 text-sm mt-1"
                                  >
                                    {errors.sessionId}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          </div>

                          {/* Website Experience Rating */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                          >
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Experience Rating <span className="text-red-500">*</span></h3>
                            <div className="flex items-center gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <motion.button
                                  key={star}
                                  type="button"
                                  onClick={() => { setRating(star); setErrors(prev => ({ ...prev, rating: "" })); }}
                                  onMouseEnter={() => setHoveredRating(star)}
                                  onMouseLeave={() => setHoveredRating(0)}
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Star 
                                    className={cn(
                                      "w-10 h-10 transition-colors duration-200",
                                      (hoveredRating || rating) >= star 
                                        ? "fill-amber-400 text-amber-400" 
                                        : "text-gray-300"
                                    )} 
                                  />
                                </motion.button>
                              ))}
                              <span className="ml-3 text-gray-600">
                                {rating > 0 ? `${rating} out of 5 stars` : "Click to rate"}
                              </span>
                            </div>
                            <AnimatePresence>
                              {errors.rating && (
                                <motion.p 
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="text-red-500 text-sm mt-1"
                                >
                                  {errors.rating}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </motion.div>

                          {/* Issue Category */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Label htmlFor="issue">Observed Issue Category <span className="text-red-500">*</span></Label>
                            <Select value={issueCategory} onValueChange={(value) => { setIssueCategory(value); setErrors(prev => ({ ...prev, issueCategory: "" })); }}>
                              <SelectTrigger className={cn("mt-1.5 transition-all duration-200", errors.issueCategory && "border-red-500")}>
                                <SelectValue placeholder="Select issue category (if any)" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">No issues observed</SelectItem>
                                <SelectItem value="ui">User Interface</SelectItem>
                                <SelectItem value="performance">Performance</SelectItem>
                                <SelectItem value="accuracy">Data Accuracy</SelectItem>
                                <SelectItem value="alerts">Alert System</SelectItem>
                                <SelectItem value="visualization">3D Visualization</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <AnimatePresence>
                              {errors.issueCategory && (
                                <motion.p 
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="text-red-500 text-sm mt-1"
                                >
                                  {errors.issueCategory}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </motion.div>

                          {/* Detailed Feedback */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                          >
                            <Label htmlFor="feedback">Detailed Feedback <span className="text-red-500">*</span></Label>
                            <Textarea 
                              id="feedback" 
                              placeholder="Please share your detailed experience, suggestions, or any issues you encountered..."
                              className={cn("mt-1.5 min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-primary/20", errors.feedback && "border-red-500")}
                              value={feedback}
                              onChange={(e) => { setFeedback(e.target.value); setErrors(prev => ({ ...prev, feedback: "" })); }}
                            />
                            <AnimatePresence>
                              {errors.feedback && (
                                <motion.p 
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="text-red-500 text-sm mt-1"
                                >
                                  {errors.feedback}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </motion.div>

                          {/* Safety Experience */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Experience <span className="text-red-500">*</span></h3>
                            <div className="grid grid-cols-3 gap-3">
                              {[
                                { value: "safe", label: "Safe", icon: "✓", color: "border-green-500 bg-green-50 text-green-700" },
                                { value: "unsafe", label: "Unsafe", icon: "✗", color: "border-red-500 bg-red-50 text-red-700" },
                                { value: "needs-improvement", label: "Needs Improvement", icon: "!", color: "border-amber-500 bg-amber-50 text-amber-700" },
                              ].map((option) => (
                                <motion.button
                                  key={option.value}
                                  type="button"
                                  onClick={() => { setSafetyExperience(option.value); setErrors(prev => ({ ...prev, safetyExperience: "" })); }}
                                  className={cn(
                                    "p-4 rounded-xl border-2 transition-all text-center",
                                    safetyExperience === option.value 
                                      ? option.color
                                      : "border-gray-200 hover:border-gray-300 bg-white"
                                  )}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <span className="text-2xl mb-2 block">{option.icon}</span>
                                  <span className="text-sm font-medium">{option.label}</span>
                                </motion.button>
                              ))}
                            </div>
                            <AnimatePresence>
                              {errors.safetyExperience && (
                                <motion.p 
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="text-red-500 text-sm mt-2"
                                >
                                  {errors.safetyExperience}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </motion.div>

                          {/* Submit Button */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                          >
                            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                              <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
                                <Send className="w-4 h-4 mr-2" />
                                Submit Feedback
                              </Button>
                            </motion.div>
                          </motion.div>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              </div>

              {/* Why Feedback Matters */}
              <div className="lg:col-span-1">
                <ScrollReveal direction="right">
                  <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 sticky top-24 hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Feedback Matters</h3>
                    
                    <div className="space-y-4">
                      {[
                        { icon: Brain, title: "AI Learning Loop", desc: "Your feedback helps train our AI models to better understand real-world scenarios.", bg: "bg-blue-100", iconColor: "text-blue-600" },
                        { icon: Shield, title: "Safety Improvement", desc: "Reports on safety help us enhance protection measures for training environments.", bg: "bg-green-100", iconColor: "text-green-600" },
                        { icon: Target, title: "Accuracy Enhancement", desc: "Your observations help us calibrate sensors and improve prediction accuracy.", bg: "bg-purple-100", iconColor: "text-purple-600" },
                      ].map((item, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <motion.div 
                            className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", item.bg)}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <item.icon className={cn("w-5 h-5", item.iconColor)} />
                          </motion.div>
                          <div>
                            <h4 className="font-medium text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div 
                      className="mt-6 p-4 bg-white rounded-lg border border-primary/20"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm text-gray-600 text-center">
                        <span className="font-semibold text-primary">500+</span> feedback submissions have helped improve our system this month
                      </p>
                    </motion.div>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
