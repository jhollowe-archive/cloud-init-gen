import { ISectionComponent, Section, SectionData } from './section';
import { propertyData } from '../utils';
import { textbox } from '../datatypes';
import { Component, Input } from '@angular/core';

// DEFINITION: https://cloudinit.readthedocs.io/en/latest/topics/modules.html#users-and-groups
export class UsersSection extends Section {
  private keepDefault: boolean = false;
  protected data: Array<User> = [];

  constructor() {
    // section type, supported_distros
    super("users", ["all"]);
    this.component = UsersComponent;

    // DEBUG
    // this.addUser(new User("asdf"));
    // this.addUser(new User("abc"));
  }

  // add in the distro-default user if enabled
  public getData(): Array<User | string> {
    return this.keepDefault ? ["default", ...this.data] : this.data;
  }

  public addUser(user: User): void {
    this.data.push(user);
  }

  public getTitle() {
    return "Users" + (this.data.length > 0 ? ": " : "") + this.data.map(val => val.name).join(", ");
  }
}

class User extends SectionData {
  @propertyData("", "The user’s login name", false)
  name: string = "";
  @propertyData(undefined, "Date on which the user’s account will be disabled")
  expiredate?: string | Date;
  @propertyData(undefined, "Comment about the user, usually a comma-separated string of real name and contact information")
  gekos?: string;
  @propertyData(undefined, "Comma separated list of additional groups to add the user to.")
  groups?: string;
  @propertyData("/home/<username>", "Home dir for user.")
  homedir?: string;
  @propertyData(undefined, "Number of days after a password expires until the account is permanently disabled.")
  inactive?: number;
  @propertyData(true, "Disable password login.")
  lock_passwd?: boolean;
  @propertyData(false, "Do not create home directory.")
  no_create_home?: boolean;
  @propertyData(false, "Do not initialize lastlog and faillog for user.")
  no_log_init?: boolean;
  @propertyData(false, "Do not create group named after user.")
  no_user_group?: boolean
  @propertyData(undefined, "Hash of user password.")
  passwd?: string; // TODO hash password when exported to YAML
  @propertyData(undefined, "Primary group for user. Default to new group named after user.")
  primary_group?: string;
  @propertyData(undefined, "SELinux user for user’s login. Default to default SELinux user.")
  selinux_user?: string;
  @propertyData(undefined, "The user’s login shell. The default is to set no shell, which results in a system-specific default being used.")
  shell?: string;
  @propertyData(undefined, "Specify an email address to create the user as a Snappy user through `snap create-user`. If an Ubuntu SSO account is associated with the address, username and SSH keys will be requested from there.")
  snapuser?: string;
  @propertyData(undefined, "List of SSH keys to add to user’s authkeys file.", true, ["ssh_redirect_user"])
  ssh_authorized_keys?: textbox;
  @propertyData(undefined, "SSH id to import for user", true, ["ssh_redirect_user"])
  ssh_import_id?: textbox;
  @propertyData(undefined, "SSH id to import for user", true, ["ssh_authorized_keys", "ssh_import_id"])
  ssh_redirect_user?: textbox;
  @propertyData(undefined, "Sudo rule to use, list of sudo rules to use or False.")
  sudo?: string; // TODO sudo rule validator
  @propertyData(false, "Create user as system user with no home directory.")
  system?: boolean;
  @propertyData(undefined, "The user’s ID.")
  uid?: number;


  // Returns an object representation of the class.
  // if verbose is set and true, this returns all properties filled with default values.
  getObj(verbose?: boolean): object {
    return {}; // TODO pull list of properties from decorators and then build a obj from values (and defaults if verbose)
  }

  constructor(name: string) {
    super();
    this.name = name;
  }
}

@Component({
  selector: 'app-sections-users',
  templateUrl: './users.component.html',
  styleUrls: ['./common.component.scss']
})
export class UsersComponent implements ISectionComponent {
  @Input() section!: Section;
}
