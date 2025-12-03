import aiService from './aiService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('aiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-key';
  });

  it('predictSeverity returns severity', async () => {
    mockedAxios.create.mockReturnValue({ post: jest.fn().mockResolvedValue({ data: { severity: 'high' } }) } as any);
    const result = await aiService.predictSeverity({ title: 'Bug', description: 'Desc' });
    expect(result).toBe('high');
  });

  it('estimateResolutionTime returns time', async () => {
    mockedAxios.create.mockReturnValue({ post: jest.fn().mockResolvedValue({ data: { estimated_time_hours: 5 } }) } as any);
    const result = await aiService.estimateResolutionTime({ title: 'Bug', description: 'Desc' });
    expect(result).toBe(5);
  });

  it('classifyBugType returns type', async () => {
    mockedAxios.create.mockReturnValue({ post: jest.fn().mockResolvedValue({ data: { bug_type: 'Backend' } }) } as any);
    const result = await aiService.classifyBugType({ title: 'Bug', description: 'Desc' });
    expect(result).toBe('Backend');
  });

  it('generateSummary returns summary', async () => {
    mockedAxios.create.mockReturnValue({ post: jest.fn().mockResolvedValue({ data: { summary: 'Summary text' } }) } as any);
    const result = await aiService.generateSummary({ title: 'Bug', description: 'Desc' });
    expect(result).toBe('Summary text');
  });

  it('findDuplicates returns duplicates', async () => {
    mockedAxios.create.mockReturnValue({ post: jest.fn().mockResolvedValue({ data: { duplicates: ['Bug1', 'Bug2'] } }) } as any);
    const result = await aiService.findDuplicates({ title: 'Bug', description: 'Desc' });
    expect(result).toEqual(['Bug1', 'Bug2']);
  });
});
