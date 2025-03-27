export interface WordFrequency {
  word: string;
  count: number;
}

// List of common words to exclude from analysis
const COMMON_WORDS = [
  'a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from',
  'by', 'with', 'in', 'out', 'over', 'under', 'again', 'further', 'then',
  'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any',
  'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
  'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can',
  'will', 'just', 'don', 'should', 'now', 'i', 'me', 'my', 'myself', 'we',
  'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves',
  'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its',
  'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which',
  'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was',
  'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
  'did', 'doing', 'would', 'should', 'could', 'ought', 'of', 'that', 'was'
];

export const analyzeTextFrequency = (texts: string[]): WordFrequency[] => {
  const wordCounts: Record<string, number> = {};
  
  texts.forEach(text => {
    // Convert to lowercase and remove punctuation
    const cleanText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    
    // Split into words
    const words = cleanText.split(/\s+/);
    
    // Count word frequency, excluding common words
    words.forEach(word => {
      if (word.length > 2 && !COMMON_WORDS.includes(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
  });
  
  // Convert to array and sort by frequency
  const wordFrequency: WordFrequency[] = Object.keys(wordCounts).map(word => ({
    word,
    count: wordCounts[word]
  }));
  
  return wordFrequency.sort((a, b) => b.count - a.count).slice(0, 10);
};