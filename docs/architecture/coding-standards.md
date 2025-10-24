# Coding Standards

## Overview

This document defines the coding standards and best practices for the Serverless ROI Calculator project. All contributors must follow these guidelines to maintain code quality and consistency.

## General Principles

1. **Type Safety First** - Always use TypeScript with strict mode enabled
2. **DRY (Don't Repeat Yourself)** - Extract common logic to shared packages
3. **SOLID Principles** - Follow object-oriented design principles
4. **Single Responsibility** - Each module/component should have one clear purpose
5. **Testability** - Write code that's easy to test

## TypeScript Standards

### Type Safety
```typescript
// ✅ Good - Explicit types
function calculateROI(investment: number, returns: number): number {
  return (returns - investment) / investment * 100;
}

// ❌ Bad - Implicit any
function calculateROI(investment, returns) {
  return (returns - investment) / investment * 100;
}
```

### Type Definitions
- Use `interface` for object shapes that may be extended
- Use `type` for unions, intersections, and primitives
- Define types in `packages/types` for cross-package usage
- Avoid `any` - use `unknown` when type is truly unknown

```typescript
// ✅ Good
interface User {
  id: string;
  email: string;
  name: string;
}

type Status = 'pending' | 'active' | 'inactive';

// ❌ Bad
const user: any = getUserData();
```

### Strict Mode
Always enable strict TypeScript checking in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true
  }
}
```

## Backend Standards (NestJS)

### Module Organization
```typescript
// Module structure
@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [FeatureController],
  providers: [FeatureService, FeatureRepository],
  exports: [FeatureService],
})
export class FeatureModule {}
```

### Service Pattern
```typescript
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    this.logger.log('Creating user', { email: dto.email });
    return this.userRepository.create(dto);
  }
}
```

### Controller Pattern
```typescript
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, type: UserDto })
  async create(@Body() dto: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(dto);
  }
}
```

### DTO (Data Transfer Object) Pattern
```typescript
// Always use DTOs for request/response validation
export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @IsString()
  @MinLength(2)
  @ApiProperty({ example: 'John Doe' })
  name: string;
}
```

### Error Handling
```typescript
// Use NestJS built-in exceptions
throw new BadRequestException('Invalid input');
throw new NotFoundException('User not found');
throw new UnauthorizedException('Invalid credentials');

// Custom exceptions for domain-specific errors
export class BusinessLogicException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
```

### Validation
- Use `class-validator` decorators on DTOs
- Enable global validation pipe in `main.ts`
- Always validate user input

### Logging
```typescript
// Use structured logging
this.logger.log('User created', { userId: user.id, email: user.email });
this.logger.error('Failed to create user', error.stack, { email: dto.email });

// Avoid console.log in production code
// ❌ console.log('debug info')
// ✅ this.logger.debug('debug info')
```

## Frontend Standards (React)

### Component Structure
```typescript
// Functional components with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
```

### Custom Hooks
```typescript
// Extract reusable logic to custom hooks
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  return { user, loading };
}
```

### Form Handling
```typescript
// Use react-hook-form with Zod validation
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

### State Management
- Use Context API for global state
- Use local state for component-specific data
- Keep state as close to usage as possible

### Component Naming
- Use PascalCase for component names
- Use descriptive names: `UserProfileCard` not `Card`
- Suffix with component type: `Button`, `Modal`, `Layout`

### Props Destructuring
```typescript
// ✅ Good - Destructure props
const UserCard = ({ name, email, avatar }: UserCardProps) => {
  // ...
};

// ❌ Bad - Use props object
const UserCard = (props: UserCardProps) => {
  return <div>{props.name}</div>;
};
```

## File Organization

### Naming Conventions
- **Files**: kebab-case (`user-profile.tsx`, `api-client.ts`)
- **Components**: PascalCase (`UserProfile.tsx`)
- **Utilities**: camelCase (`formatCurrency.ts`)
- **Constants**: UPPER_SNAKE_CASE or camelCase

### Directory Structure
```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── services/         # API clients and external services
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
├── contexts/         # React contexts
├── config/           # Configuration files
└── styles/           # Global styles
```

## Testing Standards

### Unit Tests
```typescript
describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService(mockRepository, mockLogger);
  });

  it('should create a user', async () => {
    const dto = { email: 'test@test.com', name: 'Test' };
    const result = await service.createUser(dto);
    expect(result).toBeDefined();
    expect(result.email).toBe(dto.email);
  });
});
```

### Test Coverage
- Aim for >80% code coverage
- Focus on business logic and critical paths
- Mock external dependencies

### Test Naming
```typescript
// Pattern: should [expected behavior] when [condition]
it('should return user when valid ID provided', () => {});
it('should throw error when user not found', () => {});
```

## Code Quality

### Linting
- Run `pnpm lint` before committing
- Fix linting errors, don't disable rules
- Use ESLint auto-fix: `pnpm lint --fix`

### Code Reviews
- All code must be reviewed before merging
- Address all review comments
- Keep PRs focused and reasonably sized

### Comments
```typescript
// ✅ Good - Explain WHY, not WHAT
// Calculate ROI using industry-standard formula to ensure consistency
const roi = calculateStandardROI(investment, returns);

// ❌ Bad - Redundant comment
// Get the user
const user = getUser();
```

### Magic Numbers
```typescript
// ✅ Good - Named constants
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT_MS = 5000;

// ❌ Bad - Magic numbers
if (attempts > 3) retry();
setTimeout(callback, 5000);
```

## Git Commit Standards

### Commit Message Format
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
- `test`: Test changes
- `chore`: Build/tooling changes

### Examples
```
feat(api): add user authentication endpoint

fix(web): resolve form validation error on submit

docs(readme): update installation instructions

refactor(api): extract database logic to repository
```

## Environment Variables

### Naming
- Use UPPER_SNAKE_CASE
- Prefix with app name: `API_PORT`, `WEB_API_URL`
- Never commit sensitive values

### Type Safety
```typescript
// Define env schema with validation
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

## Security Best Practices

1. **Never commit secrets** - Use `.env` files (gitignored)
2. **Validate all input** - Use DTOs with class-validator
3. **Sanitize output** - Prevent XSS attacks
4. **Use HTTPS** - In production environments
5. **Rate limiting** - Implement throttling (already configured)
6. **Security headers** - Use Helmet.js (already configured)
7. **SQL injection** - Use Prisma parameterized queries (built-in)

## Performance Best Practices

### Backend
- Use database indexes for frequent queries
- Implement pagination for large datasets
- Cache frequently accessed data
- Use connection pooling (Prisma default)

### Frontend
- Code splitting with lazy loading
- Memoize expensive computations (`useMemo`, `useCallback`)
- Optimize images and assets
- Use production build for deployment

## Accessibility

- Use semantic HTML elements
- Add proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios
- Test with screen readers

## Documentation

### Code Documentation
- Document public APIs with JSDoc
- Keep README files updated
- Document architectural decisions
- Maintain API documentation (Swagger)

### JSDoc Example
```typescript
/**
 * Calculate the Return on Investment (ROI) percentage
 * @param investment - Initial investment amount in dollars
 * @param returns - Total returns in dollars
 * @returns ROI percentage rounded to 2 decimal places
 * @throws {InvalidInputError} When investment is zero or negative
 */
export function calculateROI(investment: number, returns: number): number {
  if (investment <= 0) {
    throw new InvalidInputError('Investment must be positive');
  }
  return Number(((returns - investment) / investment * 100).toFixed(2));
}
```

## Dependencies

### Adding Dependencies
- Justify new dependencies
- Check package size and maintenance
- Prefer well-maintained packages
- Use exact versions or ^ for minor updates

### Updating Dependencies
- Test thoroughly after updates
- Update one package at a time for major versions
- Keep dependencies up to date for security

## Continuous Integration

- All tests must pass before merging
- Linting must pass
- Type checking must pass
- Build must succeed
