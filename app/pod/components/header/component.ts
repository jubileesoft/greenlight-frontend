import Component from '@glimmer/component';
import { User } from 'greenlight-frontend/gql/types';

interface HeaderArgs {
  user: User;
}

export default class Header extends Component<HeaderArgs> {}
