/**
 * Framework Similarity Matching Utility
 * 
 * This module provides functions to find similar predefined frameworks
 * based on uploaded custom frameworks using various similarity metrics.
 */

/**
 * Calculate similarity score between two frameworks
 * @param {Object} customFramework - The uploaded custom framework
 * @param {Object} predefinedFramework - A predefined framework to compare against
 * @returns {number} Similarity score between 0 and 1
 */
export function calculateFrameworkSimilarity(customFramework, predefinedFramework) {
  let totalScore = 0
  let weights = {
    category: 0.3,
    features: 0.25,
    sections: 0.2,
    requirements: 0.15,
    metadata: 0.1
  }

  // 1. Category similarity (exact match or related categories)
  const categorySimilarity = calculateCategorySimilarity(
    customFramework.category,
    predefinedFramework.category
  )
  totalScore += categorySimilarity * weights.category

  // 2. Features similarity (overlap in key features)
  const featuresSimilarity = calculateFeaturesSimilarity(
    customFramework.features || [],
    predefinedFramework.features || []
  )
  totalScore += featuresSimilarity * weights.features

  // 3. Sections similarity (similar section structure)
  const sectionsSimilarity = calculateSectionsSimilarity(
    customFramework.sections || [],
    predefinedFramework.sections || []
  )
  totalScore += sectionsSimilarity * weights.sections

  // 4. Requirements similarity (similar number and type of requirements)
  const requirementsSimilarity = calculateRequirementsSimilarity(
    customFramework.sections || [],
    predefinedFramework.sections || []
  )
  totalScore += requirementsSimilarity * weights.requirements

  // 5. Metadata similarity (industry, scope, etc.)
  const metadataSimilarity = calculateMetadataSimilarity(
    customFramework.metadata || {},
    predefinedFramework.metadata || {}
  )
  totalScore += metadataSimilarity * weights.metadata

  return totalScore
}

/**
 * Calculate category similarity
 */
function calculateCategorySimilarity(category1, category2) {
  if (!category1 || !category2) return 0
  
  // Exact match
  if (category1.toLowerCase() === category2.toLowerCase()) {
    return 1.0
  }

  // Related categories mapping
  const relatedCategories = {
    'Information Security': ['Cybersecurity Framework', 'Security Controls', 'Data Privacy'],
    'Cybersecurity Framework': ['Information Security', 'Security Controls'],
    'Security Controls': ['Information Security', 'Cybersecurity Framework'],
    'Financial Compliance': ['Industry Standard'],
    'Data Privacy': ['Information Security', 'Cybersecurity Framework'],
    'Payment Security': ['Financial Compliance', 'Data Privacy'],
    'Healthcare Compliance': ['Data Privacy', 'Industry Standard']
  }

  const related = relatedCategories[category1] || []
  if (related.includes(category2)) {
    return 0.6
  }

  return 0
}

/**
 * Calculate features similarity using Jaccard similarity
 */
function calculateFeaturesSimilarity(features1, features2) {
  if (!features1.length || !features2.length) return 0

  const set1 = new Set(features1.map(f => f.toLowerCase().trim()))
  const set2 = new Set(features2.map(f => f.toLowerCase().trim()))

  const intersection = new Set([...set1].filter(x => set2.has(x)))
  const union = new Set([...set1, ...set2])

  return intersection.size / union.size
}

/**
 * Calculate sections similarity
 */
function calculateSectionsSimilarity(sections1, sections2) {
  if (!sections1.length || !sections2.length) return 0

  // Compare section titles using text similarity
  const titles1 = sections1.map(s => s.title?.toLowerCase() || '')
  const titles2 = sections2.map(s => s.title?.toLowerCase() || '')

  let matchCount = 0
  titles1.forEach(title1 => {
    const hasMatch = titles2.some(title2 => {
      return calculateTextSimilarity(title1, title2) > 0.5
    })
    if (hasMatch) matchCount++
  })

  return matchCount / Math.max(titles1.length, titles2.length)
}

/**
 * Calculate requirements similarity
 */
function calculateRequirementsSimilarity(sections1, sections2) {
  if (!sections1.length || !sections2.length) return 0

  const totalReqs1 = sections1.reduce((sum, s) => sum + (s.requirements?.length || 0), 0)
  const totalReqs2 = sections2.reduce((sum, s) => sum + (s.requirements?.length || 0), 0)

  if (totalReqs1 === 0 || totalReqs2 === 0) return 0

  // Similarity based on requirement count (closer counts = higher similarity)
  const ratio = Math.min(totalReqs1, totalReqs2) / Math.max(totalReqs1, totalReqs2)
  
  return ratio
}

/**
 * Calculate metadata similarity
 */
function calculateMetadataSimilarity(metadata1, metadata2) {
  let score = 0
  let count = 0

  // Compare applicable industries
  if (metadata1.applicableIndustries && metadata2.applicableIndustries) {
    const industries1 = metadata1.applicableIndustries.split(',').map(i => i.trim().toLowerCase())
    const industries2 = metadata2.applicableIndustries.split(',').map(i => i.trim().toLowerCase())
    const overlap = industries1.filter(i => industries2.includes(i)).length
    if (overlap > 0) score += 1
    count++
  }

  // Compare geographic scope
  if (metadata1.geographicScope && metadata2.geographicScope) {
    if (metadata1.geographicScope.toLowerCase() === metadata2.geographicScope.toLowerCase()) {
      score += 1
    }
    count++
  }

  // Compare compliance level
  if (metadata1.complianceLevel && metadata2.complianceLevel) {
    if (metadata1.complianceLevel.toLowerCase() === metadata2.complianceLevel.toLowerCase()) {
      score += 1
    }
    count++
  }

  return count > 0 ? score / count : 0
}

/**
 * Calculate text similarity using simple word overlap
 */
function calculateTextSimilarity(text1, text2) {
  if (!text1 || !text2) return 0

  const words1 = text1.toLowerCase().split(/\s+/)
  const words2 = text2.toLowerCase().split(/\s+/)

  const set1 = new Set(words1)
  const set2 = new Set(words2)

  const intersection = new Set([...set1].filter(x => set2.has(x)))
  const union = new Set([...set1, ...set2])

  return intersection.size / union.size
}

/**
 * Find similar predefined frameworks for a custom framework
 * @param {Object} customFramework - The uploaded custom framework
 * @param {Array} predefinedFrameworks - Array of predefined frameworks
 * @param {number} threshold - Minimum similarity score (0-1) to be considered similar
 * @param {number} maxResults - Maximum number of similar frameworks to return
 * @returns {Array} Array of similar frameworks with similarity scores
 */
export function findSimilarFrameworks(customFramework, predefinedFrameworks, threshold = 0.3, maxResults = 3) {
  const similarities = predefinedFrameworks.map(predefinedFramework => ({
    framework: predefinedFramework,
    similarity: calculateFrameworkSimilarity(customFramework, predefinedFramework)
  }))

  // Filter by threshold and sort by similarity (descending)
  const similar = similarities
    .filter(item => item.similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, maxResults)

  return similar
}

/**
 * Get a human-readable explanation of why frameworks are similar
 * @param {Object} customFramework - The uploaded custom framework
 * @param {Object} predefinedFramework - A predefined framework
 * @returns {Array} Array of similarity reasons
 */
export function getSimilarityReasons(customFramework, predefinedFramework) {
  const reasons = []

  // Category match
  if (customFramework.category === predefinedFramework.category) {
    reasons.push(`Same category: ${customFramework.category}`)
  }

  // Feature overlap
  const customFeatures = new Set((customFramework.features || []).map(f => f.toLowerCase()))
  const predefinedFeatures = new Set((predefinedFramework.features || []).map(f => f.toLowerCase()))
  const commonFeatures = [...customFeatures].filter(f => predefinedFeatures.has(f))
  
  if (commonFeatures.length > 0) {
    reasons.push(`Shared features: ${commonFeatures.slice(0, 3).join(', ')}${commonFeatures.length > 3 ? '...' : ''}`)
  }

  // Similar scope
  const customReqCount = (customFramework.sections || []).reduce((sum, s) => sum + (s.requirements?.length || 0), 0)
  const predefinedReqCount = (predefinedFramework.sections || []).reduce((sum, s) => sum + (s.requirements?.length || 0), 0)
  
  if (Math.abs(customReqCount - predefinedReqCount) / Math.max(customReqCount, predefinedReqCount) < 0.3) {
    reasons.push(`Similar scope: ~${predefinedReqCount} requirements`)
  }

  // Industry overlap
  if (customFramework.metadata?.applicableIndustries && predefinedFramework.metadata?.applicableIndustries) {
    const industries1 = customFramework.metadata.applicableIndustries.split(',').map(i => i.trim().toLowerCase())
    const industries2 = predefinedFramework.metadata.applicableIndustries.split(',').map(i => i.trim().toLowerCase())
    const commonIndustries = industries1.filter(i => industries2.includes(i))
    
    if (commonIndustries.length > 0) {
      reasons.push(`Common industries: ${commonIndustries.slice(0, 2).join(', ')}`)
    }
  }

  return reasons
}

