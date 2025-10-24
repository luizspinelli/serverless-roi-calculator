# Contributing to Serverless ROI Calculator

First off, thank you for considering contributing to Serverless ROI Calculator! It's people like you that make this project great.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and explain what's wrong
- **Explain the behavior you expected to see instead**
- **Include screenshots** if relevant
- **Include your environment details** (OS, Node version, etc.)

#### Bug Report Template

```markdown
**Description:**
A clear description of the bug.

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior:**
What you expected to happen.

**Actual Behavior:**
What actually happened.

**Environment:**
- OS: [e.g., macOS 14.0]
- Node: [e.g., 18.17.0]
- pnpm: [e.g., 8.15.0]
- Browser: [e.g., Chrome 120]

**Screenshots:**
If applicable, add screenshots.

**Additional Context:**
Any other context about the problem.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List some examples of how it would be used**
- **Include mockups or examples** if applicable

### Pull Requests

- Fill in the pull request template
- Follow the [coding standards](#coding-standards)
- Include tests for new features
- Update documentation as needed
- Ensure all tests pass
- Link to relevant issues

## 🛠️ Development Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Git
- PostgreSQL (for database)

### Initial Setup

1. **Fork and clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/serverless-roi-calculator.git
cd serverless-roi-calculator
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
# Copy example files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Edit the files with your configuration
```

4. **Set up the database**

```bash
cd apps/api
pnpm prisma generate
pnpm prisma migrate dev
```

5. **Start development servers**

```bash
# From project root
pnpm dev
```

### Development Workflow

1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/my-new-feature
   # or
   git checkout -b fix/bug-description
   ```

2. Make your changes following our [coding standards](#coding-standards)

3. Test your changes:
   ```bash
   pnpm test
   pnpm lint
   pnpm build
   ```

4. Commit your changes using [conventional commits](#commit-messages)

5. Push to your fork and submit a pull request

## 🔄 Pull Request Process

1. **Update Documentation**: Ensure any new features or changes are documented

2. **Add Tests**: All new features must include appropriate tests

3. **Pass All Checks**: Ensure all tests and linting pass:
   ```bash
   pnpm test
   pnpm lint
   pnpm build
   ```

4. **Update CHANGELOG**: Add your changes to the unreleased section

5. **Keep PRs Focused**: Each PR should address a single concern

6. **Provide Context**: Fill out the PR template completely

7. **Review Process**: Wait for maintainer review and address feedback

### PR Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] All tests pass locally
- [ ] Added new tests for new features
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

## 📝 Coding Standards

### General Principles

- **Type Safety**: Use TypeScript with strict mode
- **DRY**: Don't Repeat Yourself - extract common logic
- **SOLID**: Follow SOLID principles for OOP
- **Testing**: Write tests for new features
- **Documentation**: Document complex logic

### TypeScript

```typescript
// ✅ Good - Explicit types
function calculateROI(investment: number, returns: number): number {
  return ((returns - investment) / investment) * 100;
}

// ❌ Bad - Implicit any
function calculateROI(investment, returns) {
  return ((returns - investment) / investment) * 100;
}
```

### React Components

```typescript
// ✅ Good - Functional component with types
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

// ❌ Bad - No types
export const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};
```

### NestJS Services

```typescript
// ✅ Good - Proper DI and typing
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }
}

// ❌ Bad - No DI, unclear types
export class UserService {
  async findById(id) {
    return User.findById(id);
  }
}
```

### File Organization

- Use kebab-case for file names
- One component per file
- Keep files under 300 lines
- Group related files in folders

### Code Style

- **Linting**: Follow ESLint rules
- **Formatting**: Code will be auto-formatted on commit
- **Naming**:
  - Components: PascalCase (`UserProfile.tsx`)
  - Functions: camelCase (`calculateTotal()`)
  - Constants: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)
  - Files: kebab-case (`user-profile.tsx`)

## 💬 Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `perf`: Performance improvements
- `ci`: CI/CD changes

### Examples

```bash
feat(api): add user authentication endpoint

fix(web): resolve form validation error on submit

docs(readme): update installation instructions

refactor(api): extract database logic to repository

test(web): add unit tests for calculator component

chore(deps): upgrade React to v19
```

### Scope

Use these scopes:

- `api` - Backend API changes
- `web` - Frontend changes
- `shared` - Shared package changes
- `types` - Types package changes
- `docs` - Documentation
- `deps` - Dependencies
- `ci` - CI/CD

## 🧪 Testing Guidelines

### Writing Tests

- Write tests for all new features
- Test edge cases and error conditions
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### Backend Tests

```typescript
describe('UserService', () => {
  let service: UserService;
  let repository: MockUserRepository;

  beforeEach(() => {
    repository = new MockUserRepository();
    service = new UserService(repository);
  });

  it('should create a user with valid data', async () => {
    // Arrange
    const dto = { email: 'test@test.com', name: 'Test User' };

    // Act
    const result = await service.createUser(dto);

    // Assert
    expect(result).toBeDefined();
    expect(result.email).toBe(dto.email);
  });

  it('should throw error when email is invalid', async () => {
    // Arrange
    const dto = { email: 'invalid', name: 'Test' };

    // Act & Assert
    await expect(service.createUser(dto)).rejects.toThrow();
  });
});
```

### Frontend Tests

```typescript
describe('Calculator Component', () => {
  it('should calculate ROI correctly', () => {
    // Arrange
    render(<Calculator />);
    const investmentInput = screen.getByLabelText('Investment');
    const returnsInput = screen.getByLabelText('Returns');
    const calculateButton = screen.getByText('Calculate');

    // Act
    fireEvent.change(investmentInput, { target: { value: '100' } });
    fireEvent.change(returnsInput, { target: { value: '150' } });
    fireEvent.click(calculateButton);

    // Assert
    expect(screen.getByText('ROI: 50%')).toBeInTheDocument();
  });
});
```

### Test Coverage

- Aim for >80% code coverage
- Focus on business logic
- Don't test external libraries
- Test user interactions, not implementation details

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov

# Run E2E tests
pnpm --filter @repo/api test:e2e
```

## 📚 Documentation

### Code Documentation

Use JSDoc for functions and classes:

```typescript
/**
 * Calculate the Return on Investment (ROI) percentage
 * @param investment - Initial investment amount in dollars
 * @param returns - Total returns in dollars
 * @returns ROI percentage rounded to 2 decimal places
 * @throws {InvalidInputError} When investment is zero or negative
 * @example
 * calculateROI(1000, 1500) // Returns 50.00
 */
export function calculateROI(investment: number, returns: number): number {
  if (investment <= 0) {
    throw new InvalidInputError('Investment must be positive');
  }
  return Number(((returns - investment) / investment * 100).toFixed(2));
}
```

### README Updates

- Update README for new features
- Add examples for new functionality
- Keep API documentation current
- Update architecture docs if structure changes

### Architecture Documentation

Located in `docs/architecture/`:

- Update when adding new patterns
- Document major architectural decisions
- Keep diagrams current
- Explain design choices

## 🎯 Best Practices

### General

- Keep functions small and focused
- Use meaningful variable names
- Avoid premature optimization
- Write self-documenting code
- Add comments for complex logic only

### Security

- Never commit secrets or API keys
- Validate all user input
- Sanitize data before display
- Use prepared statements for database queries
- Follow OWASP guidelines

### Performance

- Avoid unnecessary re-renders (React)
- Use database indexes appropriately
- Implement pagination for large datasets
- Optimize images and assets
- Use code splitting

### Accessibility

- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios

## ❓ Questions?

Feel free to:

- Open an issue for discussion
- Ask in GitHub Discussions
- Check existing documentation
- Review closed issues and PRs

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Serverless ROI Calculator! 🎉

Made with ❤️ by [Luiz Spinelli](https://spinelli.dev.br/)
