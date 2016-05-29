import {Page} from 'ionic-angular';
import {HomePage} from '../home/home';
import {DoneClass} from '../done/done';
//import {Page3} from '../page3/page3';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = DoneClass;

  //tab3Root: any = Page3;
}
