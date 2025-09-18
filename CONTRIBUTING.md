# Contributing to Pump.fun Stream Overlay

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Basic knowledge of React/Next.js
- Understanding of TypeScript (preferred)

### Development Setup

1. **Fork and clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/pump-fun-overlay.git
   cd pump-fun-overlay
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Create environment file**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🎯 How to Contribute

### Reporting Bugs

1. Check existing issues first
2. Use the bug report template
3. Include steps to reproduce
4. Add screenshots/videos if applicable

### Suggesting Features

1. Check if feature already exists or is planned
2. Use the feature request template
3. Explain the use case and benefits
4. Consider implementation complexity

### Code Contributions

1. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

2. **Make your changes**
   - Follow existing code style
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes**
   \`\`\`bash
   npm run test
   npm run lint
   npm run type-check
   \`\`\`

4. **Commit with conventional commits**
   \`\`\`bash
   git commit -m "feat: add new animation effect"
   git commit -m "fix: resolve WebSocket connection issue"
   git commit -m "docs: update API documentation"
   \`\`\`

5. **Push and create PR**
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`

## 📋 Code Guidelines

### TypeScript

- Use strict TypeScript configuration
- Define proper interfaces for all data structures
- Avoid `any` types - use proper typing

### React/Next.js

- Use functional components with hooks
- Implement proper error boundaries
- Follow Next.js best practices for performance

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure responsive design
- Test in both light and dark modes

### Performance

- Optimize WebSocket connections
- Implement proper memoization
- Minimize re-renders
- Use proper loading states

## 🧪 Testing

### Running Tests

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

### Writing Tests

- Write unit tests for utility functions
- Add integration tests for components
- Test WebSocket connections and data flow
- Include accessibility tests

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for complex functions
- Document component props with TypeScript
- Include usage examples in comments

### README Updates

- Update feature lists when adding functionality
- Add new configuration options
- Update deployment instructions if needed

## 🎨 Design Contributions

### UI/UX Improvements

- Follow the existing design language
- Consider accessibility (WCAG guidelines)
- Test with different overlay sizes
- Ensure compatibility with streaming software

### Animation Guidelines

- Keep animations smooth and performant
- Provide options to disable animations
- Consider motion sensitivity
- Test on lower-end devices

## 🚀 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR** - Breaking changes
- **MINOR** - New features (backward compatible)
- **PATCH** - Bug fixes

### Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] Version bumped appropriately
- [ ] Changelog updated
- [ ] Performance tested
- [ ] Accessibility verified

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Help newcomers learn
- Provide constructive feedback
- Focus on the code, not the person

### Communication

- Use clear, descriptive commit messages
- Comment your code when necessary
- Be responsive to feedback
- Ask questions when unsure

## 🏆 Recognition

Contributors will be:
- Added to the contributors list
- Mentioned in release notes
- Invited to the contributors Discord channel
- Eligible for contributor swag

## 📞 Getting Help

- **Discord** - Join our development channel
- **GitHub Discussions** - Ask questions and share ideas
- **Issues** - Report bugs or request features
- **Email** - dev@youroverlay.com for sensitive matters

Thank you for contributing to make streaming more engaging for the crypto community! 🎉
