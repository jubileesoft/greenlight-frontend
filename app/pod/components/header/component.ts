import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import UserService from 'greenlight-frontend/services/user';
import { User } from 'greenlight-frontend/gql/types';

interface HeaderArgs {
  user: User;
}

export default class Header extends Component<HeaderArgs> {}
