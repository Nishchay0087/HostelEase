import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, CheckCircle2, Clock, MapPin, Phone, MessageSquare, Star, MessageCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function TrackIssues() {
  const { user, complaints, submitFeedback } = useApp();
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState(null);

  // For students, show their own complaints. For wardens, show all pending/active.
  const displayComplaints = user.role === 'student' 
    ? complaints.filter(c => c.studentId === user.id)
    : complaints;

  const STATUS_STEPS = ['pending', 'assigned', 'in-progress', 'resolved'];

  const getStatusLabel = (status) => {
    switch(status) {
      case 'pending': return 'Submitted';
      case 'assigned': return 'Assigned';
      case 'in-progress': return 'On the way';
      case 'resolved': return 'Resolved';
      default: return 'Submitted';
    }
  };

  const IssueCard = ({ issue }) => (
    <div 
      className="card mb-4 cursor-pointer hover:border-primary-300 transition-colors"
      onClick={() => setSelectedIssue(issue)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
            <MapPin size={16} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{issue.category}</h3>
            <p className="text-xs text-gray-500">{new Date(issue.submittedAt).toLocaleDateString()}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-bold rounded-full ${
          issue.urgency === 'high' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'
        }`}>
          {issue.urgency === 'high' ? 'Urgent' : 'Normal'}
        </span>
      </div>
      
      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{issue.description}</p>
      
      {/* Mini Stepper */}
      <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
        {STATUS_STEPS.map((step, idx) => {
          const isActive = STATUS_STEPS.indexOf(issue.status) >= idx;
          return (
            <div key={step} className="flex flex-col items-center flex-1 relative">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center z-10 ${isActive ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}>
                {isActive && <CheckCircle2 size={10} />}
              </div>
              {idx < STATUS_STEPS.length - 1 && (
                <div className={`absolute top-2 left-[50%] w-full h-[2px] -z-0 ${
                  STATUS_STEPS.indexOf(issue.status) > idx ? 'bg-primary-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const FeedbackModal = ({ issue }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleFeedback = () => {
      submitFeedback(issue.id, rating, comment);
      setSelectedIssue(null);
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-[100] flex items-end sm:items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm rounded-3xl p-6 animate-slide-up pb-safe">
          <h3 className="text-xl font-bold text-center mb-2">Rate Service</h3>
          <p className="text-sm text-gray-500 text-center mb-6">How was the resolution for your {issue.category} issue?</p>
          
          <div className="flex justify-center gap-2 mb-6">
            {[1,2,3,4,5].map(star => (
              <button key={star} onClick={() => setRating(star)} className="p-1 transition-transform hover:scale-110">
                <Star size={32} className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              </button>
            ))}
          </div>

          <textarea
            className="input-field w-full text-sm mb-6 resize-none"
            rows={3}
            placeholder="Add a comment (optional)..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <div className="flex gap-3">
            <button className="flex-1 btn-secondary py-3" onClick={() => setSelectedIssue(null)}>Cancel</button>
            <button className="flex-1 btn-primary py-3" onClick={handleFeedback}>Submit</button>
          </div>
        </div>
      </div>
    );
  };

  const IssueDetail = ({ issue }) => (
    <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col max-w-lg mx-auto md:border-x md:border-gray-200 animate-slide-up">
      <div className="glass-header px-4 py-4 flex items-center gap-3">
        <button onClick={() => setSelectedIssue(null)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Issue Details</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-xl ${issue.urgency === 'high' ? 'bg-red-50 text-red-600' : 'bg-primary-50 text-primary-600'}`}>
              <AlertCircle size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold">{issue.category}</h2>
              <p className="text-sm text-gray-500 text-xs">{new Date(issue.submittedAt).toLocaleString()}</p>
            </div>
          </div>
          <p className="text-sm text-gray-800 bg-gray-50 p-4 rounded-xl border border-gray-100">{issue.description}</p>
        </div>

        {/* Detailed Timeline */}
        <div className="card">
          <h3 className="font-bold text-gray-900 mb-4 px-2">Progress Tracker</h3>
          <div className="px-4">
            {STATUS_STEPS.map((step, idx) => {
              const isActive = STATUS_STEPS.indexOf(issue.status) >= idx;
              const isCurrent = STATUS_STEPS.indexOf(issue.status) === idx;
              return (
                <div key={step} className="flex relative pb-8 last:pb-0">
                  {/* Line connecting nodes */}
                  {idx < STATUS_STEPS.length - 1 && (
                    <div className={`absolute top-6 left-[11px] bottom-0 w-0.5 -mt-2 ${STATUS_STEPS.indexOf(issue.status) > idx ? 'bg-primary-500' : 'bg-gray-200'}`} />
                  )}
                  
                  {/* Node */}
                  <div className={`relative z-10 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1 mr-4 ${
                    isActive ? 'bg-primary-500 text-white' : 'bg-gray-200 border-2 border-white'
                  }`}>
                    {isActive ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className={`text-sm font-bold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                      {getStatusLabel(step)}
                    </h4>
                    
                    {step === 'pending' && isActive && (
                      <p className="text-xs text-gray-500 mt-1">We have received your complaint.</p>
                    )}
                    
                    {step === 'assigned' && isActive && issue.assignedTo && (
                      <div className="mt-2 bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-center gap-3">
                         <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">T</div>
                         <div className="flex-1">
                           <p className="text-xs font-bold text-gray-900">Technician Assigned</p>
                           {issue.eta && <p className="text-xs text-blue-700 flex items-center gap-1 mt-0.5"><Clock size={12}/> ETA: {issue.eta}</p>}
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        {user.role === 'student' && issue.status !== 'resolved' && (
          <div className="grid grid-cols-2 gap-3 pb-8">
            <button className="flex flex-col items-center justify-center gap-2 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm text-gray-700 hover:bg-gray-50 active:scale-95 transition-all">
              <Phone size={24} className="text-green-500" />
              <span className="text-xs font-bold">Call Warden</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm text-gray-700 hover:bg-gray-50 active:scale-95 transition-all">
              <MessageCircle size={24} className="text-blue-500" />
              <span className="text-xs font-bold">Message Staff</span>
            </button>
          </div>
        )}

        {user.role === 'student' && issue.status === 'resolved' && !issue.feedback && (
          <button onClick={() => setRating(5)} className="w-full btn-primary py-4 flex items-center justify-center gap-2">
            <Star size={20} className="fill-white" />
            Provide Feedback
          </button>
        )}
      </div>

      {issue.status === 'resolved' && !issue.feedback && rating > 0 && <FeedbackModal issue={issue} />}
    </div>
  );

  return (
    <div className="pb-safe h-screen flex flex-col">
      <div className="glass-header px-4 py-4 backdrop-blur-xl bg-white/90 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">
          {user.role === 'student' ? 'My Complaints' : 'All Tasks'}
        </h1>
      </div>

      <div className="p-4 flex-1 overflow-y-auto pb-24">
        {displayComplaints.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-20">
            <CheckCircle2 size={48} className="text-gray-300 mb-4" />
            <p className="text-lg font-medium">No active complaints</p>
            <p className="text-sm">Everything is running smoothly!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayComplaints.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </div>

      {selectedIssue && <IssueDetail issue={selectedIssue} />}
    </div>
  );
}

export default TrackIssues;
