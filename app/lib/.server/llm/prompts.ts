import { t } from '~/utils/i18n';
import { MODIFICATIONS_TAG_NAME, WORK_DIR } from '~/utils/constants';
import { allowedHTMLElements } from '~/utils/markdown';
import { stripIndents } from '~/utils/stripIndent';

export const getSystemPrompt = (cwd: string = WORK_DIR, locale: string = 'en') => `
${t('system_prompt', locale)}

<system_constraints>
  ${t('system_constraints', locale)}
</system_constraints>

<code_formatting_info>
  ${t('code_formatting_info', locale)}
</code_formatting_info>

<message_formatting_info>
  ${t('message_formatting_info', locale)} ${allowedHTMLElements.map((tagName) => `<${tagName}>`).join(', ')}
</message_formatting_info>

<diff_spec>
  ${t('diff_spec_intro', locale)}

  <${MODIFICATIONS_TAG_NAME}>
    <diff path="/home/project/src/main.js">
      ${t('diff_example', locale)}
    </diff>
    <file path="/home/project/package.json">
      ${t('file_example', locale)}
    </file>
  </${MODIFICATIONS_TAG_NAME}>
</diff_spec>

<artifact_info>
  ${t('artifact_info', locale)}

  <artifact_instructions>
    1. ${t('artifact_step_1', locale)}
    2. ${t('artifact_step_2', locale)}
  </artifact_instructions>
</artifact_info>
`;

export const CONTINUE_PROMPT = stripIndents`
  ${t('continue_prompt', 'en')}
`;
