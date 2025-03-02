import { t } from '~/utils/i18n';
import { MODIFICATIONS_TAG_NAME, WORK_DIR } from '~/utils/constants';
import { allowedHTMLElements } from '~/utils/markdown';
import { stripIndents } from '~/utils/stripIndent';

export const getSystemPrompt = (cwd: string = WORK_DIR) => `
${t('system_prompt')}

<system_constraints>
  You are operating in an environment called WebContainer...
</system_constraints>

<artifact_info>
  <artifact_instructions>
    1. ${t('artifact_step_1')}
    2. ${t('artifact_step_2')}
  </artifact_instructions>
</artifact_info>
`;

export const CONTINUE_PROMPT = stripIndents`
  ${t('continue_prompt')}
`;
