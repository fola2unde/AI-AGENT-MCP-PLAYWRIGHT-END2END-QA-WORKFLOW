# QA Story & Prompt File Creation Workflow - Quick Reference Guide

**Purpose:** Quick reference for executing the 6-step workflow for creating new QA user stories and prompt files.

**Document:** QA-STORY-CREATION-WORKFLOW.md (full guide)  
**This Guide:** Quick execution checklist and visual reference

---

## Workflow at a Glance

```
┌─────────────────────────────────────────────────────────────────┐
│  QA Story & Prompt File Creation Workflow (6 Steps)             │
└─────────────────────────────────────────────────────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
         ┌──────────▼──────────┐  ┌──────▼──────────┐
         │  ANALYSIS PHASE     │  │  CREATION       │
         │  (STEP 1-2)         │  │  PHASE          │
         │                     │  │  (STEP 3-5)     │
         │  • Analyze Stories  │  │                 │
         │  • Analyze Prompts  │  │  • New Story    │
         │  • Document Patterns│  │  • New Prompt   │
         │  (2-3 hours)        │  │  (10-15 hours)  │
         └─────────────┬────────┘  └────────┬────────┘
                       │                     │
                       └──────────┬──────────┘
                                  │
                       ┌──────────▼──────────┐
                       │ REVIEW PHASE        │
                       │ (STEP 4 & 6)        │
                       │                     │
                       │ • Review Story      │
                       │ • Review Prompt     │
                       │ • Quality Assure    │
                       │ (6-8 hours)         │
                       └──────────┬──────────┘
                                  │
                       ┌──────────▼──────────┐
                       │ COMPLETE            │
                       │ • Approved Stories  │
                       │ • Approved Prompts  │
                       │ • Ready for QA Team │
                       └─────────────────────┘
```

---

## Step-by-Step Execution Flow

### PHASE 1: ANALYSIS & LEARNING (6-8 hours, Day 1)

#### STEP 1: Analyze Existing User Stories (2-3 hours)
**Input Files:**
- `user-stories/SCRUM-101-ecommerce-checkout.md`
- `user-stories/SCRUM-102-product-discovery.md`

**Analyze:**
- [ ] Story structure and sections
- [ ] Content patterns and conventions
- [ ] AC structure (BDD format)
- [ ] Testing guidance patterns
- [ ] Formatting and styling
- [ ] Section order and organization

**Output:**
- [ ] Pattern documentation
- [ ] Conventions checklist
- [ ] Template for new stories
- [ ] Best practices list

#### STEP 2: Analyze Existing Prompt Files (2-3 hours)
**Input Files:**
- `prompts/QAEnd2EndPromptFile.md`
- `prompts/SCRUM102-QAEnd2EndPromptFile.md`

**Analyze:**
- [ ] 7-step workflow structure
- [ ] Step pattern consistency
- [ ] Agent and tool references
- [ ] Test scenario organization
- [ ] Expected outputs format
- [ ] Integration approaches

**Output:**
- [ ] Workflow structure documentation
- [ ] Step pattern template
- [ ] Agent reference guide
- [ ] Best practices list

---

### PHASE 2: CREATION & DEVELOPMENT (10-15 hours, Day 2-3)

#### STEP 3: Create New User Story (4-5 hours)
**Output File:**
- `user-stories/SCRUM-103-shopping-cart-management.md`

**Create Sections:**
- [ ] Story Title (BDD format)
- [ ] Story Description
- [ ] Application URL & Credentials
- [ ] Prerequisites & Testing Environment
- [ ] 12 Acceptance Criteria (GIVEN-WHEN-THEN-AND)
- [ ] Business Rules (8+)
- [ ] Technical Notes
- [ ] Definition of Done (10+ checkpoints)
- [ ] Out-of-Scope Section
- [ ] Testing Notes & Assumptions
- [ ] Related Stories
- [ ] Story Points & Priority
- [ ] Dependencies
- [ ] AC Testing Guidance & Edge Cases

**Validation:**
- [ ] All 12 ACs in BDD format
- [ ] 40+ test scenarios documented
- [ ] 45+ edge cases detailed
- [ ] 500+ lines of content
- [ ] Follows SCRUM-101/102 pattern
- [ ] File saved and readable

#### STEP 4: Review User Story (3-4 hours)
**Input File:**
- `user-stories/SCRUM-103-shopping-cart-management.md`

**Output File:**
- `SCRUM-103-REVIEW.md`

**Review Areas:**
- [ ] Structural compliance
- [ ] BDD format validation
- [ ] AC quality (all 12 ACs)
- [ ] Business rules alignment
- [ ] Dependencies & prerequisites
- [ ] Testing coverage (40+ scenarios, 45+ edge cases)
- [ ] SauceDemo alignment
- [ ] Story points validation
- [ ] Definition of Done completeness
- [ ] Out-of-Scope clarity
- [ ] AC Testing Guidance quality
- [ ] Issues identification
- [ ] Consistency with SCRUM-101/102
- [ ] Professional quality

**Validation:**
- [ ] 200+ line review report
- [ ] All aspects assessed
- [ ] APPROVED status
- [ ] File saved and readable

#### STEP 5: Create Prompt File (5-6 hours)
**Input File:**
- `user-stories/SCRUM-103-shopping-cart-management.md`

**Output File:**
- `prompts/SCRUM-103-QAEnd2EndPromptFile.md`

**Create Sections:**
- [ ] Workflow Overview
- [ ] STEP 1: Read User Story (with prompt and expected outputs)
- [ ] STEP 2: Create Test Plan (with prompt, agent reference, outputs)
- [ ] STEP 3: Exploratory Testing (with prompt, testing guidance, outputs)
- [ ] STEP 4: Generate Automation Scripts (with prompt, code standards, outputs)
- [ ] STEP 5: Execute & Heal Tests (with prompt, healing process, outputs)
- [ ] STEP 6: Create Test Report (with prompt, report structure, outputs)
- [ ] STEP 7: Commit & Document (with prompt, git workflow, outputs)
- [ ] Implementation Notes
- [ ] Success Criteria
- [ ] Browser/Device Configuration

**Validation:**
- [ ] All 7 steps detailed
- [ ] 40+ test scenarios mapped
- [ ] 45+ edge cases documented
- [ ] 3000+ words of guidance
- [ ] All file paths specified
- [ ] Follows existing prompt pattern
- [ ] File saved and readable

---

### PHASE 3: QUALITY ASSURANCE & APPROVAL (6-8 hours, Day 3-4)

#### STEP 6: Review Prompt File (3-4 hours)
**Input File:**
- `prompts/SCRUM-103-QAEnd2EndPromptFile.md`

**Output File:**
- `SCRUM-103-PROMPT-FILE-REVIEW.md`

**Review Areas:**
- [ ] Structural compliance (7 steps)
- [ ] Workflow architecture
- [ ] Individual step quality (STEP 1-7)
- [ ] Cross-file consistency
- [ ] Story integration
- [ ] Agent & tool references
- [ ] Test coverage specification
- [ ] Integration points (SCRUM-102, SCRUM-101)
- [ ] SauceDemo appropriateness
- [ ] File path accuracy
- [ ] Expected outputs specification
- [ ] Browser/device coverage
- [ ] Accessibility testing
- [ ] Issues identification
- [ ] Professional quality

**Validation:**
- [ ] 300+ line review report
- [ ] All 15 aspects assessed
- [ ] APPROVED status
- [ ] Implementation timeline provided
- [ ] File saved and readable

---

## Quality Gate Checklist

### STEP 1 Complete: ✅
- [ ] Patterns analyzed from SCRUM-101
- [ ] Patterns analyzed from SCRUM-102
- [ ] 8-10 pattern areas documented
- [ ] Conventions checklist created
- [ ] Best practices identified
- [ ] Ready for STEP 3

### STEP 2 Complete: ✅
- [ ] 7-step workflow understood
- [ ] Consistency between prompts verified
- [ ] Agents and tools identified
- [ ] Step progression documented
- [ ] 6-8 analysis areas completed
- [ ] Ready for STEP 5

### STEP 3 Complete: ✅
- [ ] 12 ACs written in BDD format
- [ ] All required sections present
- [ ] 500+ lines of content
- [ ] File: `user-stories/SCRUM-103-shopping-cart-management.md`
- [ ] Follows SCRUM-101/102 structure
- [ ] Ready for STEP 4 review

### STEP 4 Complete: ✅
- [ ] Review report created (200+ lines)
- [ ] All 14 aspects addressed
- [ ] Issues identified (if any)
- [ ] APPROVED status granted
- [ ] File: `SCRUM-103-REVIEW.md`
- [ ] Ready for STEP 5

### STEP 5 Complete: ✅
- [ ] 7 steps detailed and complete
- [ ] 40+ test scenarios documented
- [ ] 45+ edge cases included
- [ ] 3000+ words of guidance
- [ ] All file paths specified
- [ ] 12 ACs fully mapped
- [ ] File: `prompts/SCRUM-103-QAEnd2EndPromptFile.md`
- [ ] Ready for STEP 6 review

### STEP 6 Complete: ✅
- [ ] Review report created (300+ lines)
- [ ] All 15 aspects addressed
- [ ] Issues identified (if any)
- [ ] APPROVED status granted
- [ ] Implementation timeline provided
- [ ] File: `SCRUM-103-PROMPT-FILE-REVIEW.md`
- [ ] **Ready for QA Team Implementation**

---

## File Organization Reference

### Input Files (Read-Only)
```
✓ user-stories/SCRUM-101-ecommerce-checkout.md
✓ user-stories/SCRUM-102-product-discovery.md
✓ prompts/QAEnd2EndPromptFile.md
✓ prompts/SCRUM102-QAEnd2EndPromptFile.md
```

### Output Files (Created)
```
✓ user-stories/SCRUM-103-shopping-cart-management.md
✓ prompts/SCRUM-103-QAEnd2EndPromptFile.md
✓ SCRUM-103-REVIEW.md
✓ SCRUM-103-PROMPT-FILE-REVIEW.md
```

### Reference Documents
```
✓ QA-STORY-CREATION-WORKFLOW.md (full guide)
✓ QA-STORY-CREATION-WORKFLOW-QUICK-REFERENCE.md (this document)
```

---

## Timing Breakdown

| Phase | Step | Duration | Day |
|-------|------|----------|-----|
| Analysis | STEP 1 | 2-3 hrs | Day 1 |
| Analysis | STEP 2 | 2-3 hrs | Day 1 |
| Creation | STEP 3 | 4-5 hrs | Day 2 |
| Review | STEP 4 | 3-4 hrs | Day 2 |
| Creation | STEP 5 | 5-6 hrs | Day 3 |
| Review | STEP 6 | 3-4 hrs | Day 3 |
| **TOTAL** | **6 Steps** | **20-25 hrs** | **3 Days** |

---

## Common Patterns to Remember

### Story Structure (Always in this order)
1. Story Title
2. Story Description
3. Application URL
4. Test Credentials
5. Prerequisites
6. Acceptance Criteria
7. Business Rules
8. Technical Notes
9. Definition of Done
10. Out-of-Scope
11. Testing Notes
12. Related Stories
13. Story Points
14. Dependencies
15. AC Testing Guidance

### Prompt Structure (Always 7 steps)
1. Workflow Overview
2. STEP 1: Read User Story
3. STEP 2: Create Test Plan
4. STEP 3: Exploratory Testing
5. STEP 4: Generate Automation Scripts
6. STEP 5: Execute & Heal Tests
7. STEP 6: Create Test Report
8. STEP 7: Commit & Document
9. Implementation Notes
10. Success Criteria

### AC Structure (Always BDD)
```
### AC#: [Title]
- GIVEN [initial condition]
- WHEN [action performed]
- THEN [observable result]
- AND [additional condition]
- AND [additional condition]
```

---

## Key Metrics to Track

### User Story Metrics
- [ ] AC Count: 12 (target)
- [ ] Test Scenarios: 40+ (target)
- [ ] Edge Cases: 45+ (target)
- [ ] Content Length: 500+ lines (target)
- [ ] Story Points: 8-13 (estimate)

### Prompt File Metrics
- [ ] Steps: 7 (required)
- [ ] Test Scenarios Mapped: 40+ (target)
- [ ] Edge Cases Documented: 45+ (target)
- [ ] Content Length: 3000+ words (target)
- [ ] Expected Outputs: 6-8 per step (target)

### Review Metrics
- [ ] Story Review: 200+ lines (target)
- [ ] Prompt Review: 300+ lines (target)
- [ ] Issues Found: Documented and resolved
- [ ] Approval Status: APPROVED
- [ ] Ready for Implementation: YES

---

## Troubleshooting Guide

### Issue: STEP 3 User Story feels incomplete
**Solution:**
- Verify you have 12 ACs (not fewer)
- Check each AC has 5-7 lines of conditions
- Review AC Testing Guidance section (should be 40+ lines)
- Compare with SCRUM-102 length (should be similar)
- Add missing edge cases and scenarios

### Issue: STEP 5 Prompt File is too short
**Solution:**
- Verify all 7 steps are present
- Check each step has detailed prompt guidance
- Review expected outputs (6-8 per step)
- Compare with SCRUM102-QAEnd2EndPromptFile.md
- Add more detail to each step

### Issue: STEP 4 or 6 Review shows issues
**Solution:**
- Address Critical issues immediately
- Document High issues with severity
- Note Medium/Low issues for next iteration
- Re-review after fixes
- Update approval status

---

## Success Indicators

### ✅ Workflow Complete When:
- [ ] All 6 steps executed
- [ ] User story APPROVED
- [ ] Prompt file APPROVED
- [ ] All output files created
- [ ] All files saved correctly
- [ ] Content meets quality standards
- [ ] Ready for QA team to use

### ✅ Ready for QA Team When:
- [ ] User story is comprehensive (12 ACs)
- [ ] Prompt file has 7-step workflow
- [ ] All reviews are APPROVED
- [ ] Implementation timeline provided
- [ ] Success criteria defined
- [ ] Files committed to repository
- [ ] Team notified and ready

---

## Next Steps After Completion

Once STEP 6 is complete and APPROVED:

1. **Commit to Repository**
   ```bash
   git add user-stories/SCRUM-103-shopping-cart-management.md
   git add prompts/SCRUM-103-QAEnd2EndPromptFile.md
   git add SCRUM-103-REVIEW.md
   git add SCRUM-103-PROMPT-FILE-REVIEW.md
   git commit -m "Add SCRUM-103: Shopping Cart Management with full QA workflow"
   git push origin main
   ```

2. **Notify QA Team**
   - Share user story file
   - Share prompt file
   - Provide implementation timeline
   - Answer questions

3. **QA Team Executes STEP 1 of Prompt**
   - Reads and summarizes user story
   - Verifies understanding
   - Ready for STEP 2

4. **Plan Next Story**
   - SCRUM-104 (Order History)
   - SCRUM-105 (User Preferences)
   - SCRUM-106 (Advanced Search)

---

## Additional Resources

- **Full Guide:** QA-STORY-CREATION-WORKFLOW.md
- **SCRUM-101:** user-stories/SCRUM-101-ecommerce-checkout.md
- **SCRUM-102:** user-stories/SCRUM-102-product-discovery.md
- **SCRUM-103:** user-stories/SCRUM-103-shopping-cart-management.md (after creation)

---

**Document Version:** 1.0  
**Created:** April 17, 2026  
**Last Updated:** April 17, 2026  
**Status:** Ready for Use  
