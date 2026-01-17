import mongoose from 'mongoose';

const codeAnalysisSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    maxlength: 50000 // Limit code length
  },
  operation: {
    type: String,
    required: true,
    enum: ['explain', 'fix', 'optimize', 'unknown']
  },
  aiResponse: {
    type: String,
    required: false,
    default: ''
  },
  language: {
    type: String,
    default: 'unknown'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    default: 'unknown'
  },
  userAgent: {
    type: String,
    default: 'unknown'
  },
  responseTime: {
    type: Number, // milliseconds
    default: 0
  },
  success: {
    type: Boolean,
    default: true
  },
  errorMessage: {
    type: String,
    default: null
  }
}, {
  timestamps: true,
  collection: 'code_analyses'
});

// Indexes for better query performance
codeAnalysisSchema.index({ timestamp: -1 });
codeAnalysisSchema.index({ operation: 1 });
codeAnalysisSchema.index({ success: 1 });

// Pre-save middleware to limit code storage
codeAnalysisSchema.pre('save', function (next) {
  // Truncate code if too long for storage
  if (this.code && this.code.length > 10000) {
    this.code = this.code.substring(0, 10000) + '... [truncated]';
  }
  next();
});

const CodeAnalysis = mongoose.model('CodeAnalysis', codeAnalysisSchema);

export default CodeAnalysis;