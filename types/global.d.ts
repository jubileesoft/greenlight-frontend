// Types for compiled templates
declare module 'greenlight-frontend/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}

declare module '*.graphql' {
  const doc: import('graphql').DocumentNode;
  export default doc;
}
