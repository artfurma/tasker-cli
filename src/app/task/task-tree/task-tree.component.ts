import { TaskService } from './../shared/task.service';
import { Component, OnInit } from '@angular/core';
import { Task, IControlPoint, FilteredTask } from '../shared/task.model';
import { ActivatedRoute } from '@angular/router';
import { AuthGuard } from "../../auth/guard/auth.guard";
import { TaskFiltersService } from "../shared/task-filters.service";
import { User } from '../../users/user/user';

@Component({
  selector: 'tskr-task-tree',
  templateUrl: './task-tree.component.html',
  styleUrls: ['./task-tree.component.scss'],
  providers: [AuthGuard]
})

export class TaskTreeComponent implements OnInit {


  filters: TreeVisible[];
  list: Task[];
  filterdList: FilteredTask[];
  UsersFilters: User[];
  MilestonesFilters: IControlPoint[];

  constructor(private _route: ActivatedRoute,
              private _taskService: TaskService,
              private _taskFiltersService:TaskFiltersService) {
                this.UsersFilters = new Array();
                this.MilestonesFilters= new Array();
               }

  ngOnInit() {
    // this.list = this._route.snapshot.data['tasks'];
    this._taskService.getTasksDb().subscribe(res => {this.list = res;
      console.log(this.list);
    });
    this._taskFiltersService.SharedList$.subscribe(lst =>{ 
      this.UsersFilters = lst;

      if(this.list!=undefined)this.buildVisibilityTree();
    });
    this._taskFiltersService.SharedList2$.subscribe(lst =>{
      this.MilestonesFilters = lst;
      if(this.list!=undefined) this.buildVisibilityTree();

     });
  }



  buildVisibilityTree(){
    this.filters=new Array<TreeVisible>(this.list.length) ;
    this.list.forEach((task,index) => {
      if(task.children.length>0){
        console.log(this.filters)
        this.filters[index]= new TreeVisible();
        this.filters[index].childrens= new Array<TreeVisible>(task.children.length);
        this.filters[index].visible= this.makeVisibilityTree(task.children,this.filters[index].childrens);
        
      }else{
        this.filters[index].visible=  this.checkUsersFilters(task) && this.checkMilestonesFilters(task);
      }
    });
  }

  makeVisibilityTree(list:Task[], filters:TreeVisible[]):boolean{
    list.forEach((task,index) => {
      if(task.children.length>0){
        filters[index]= new TreeVisible();
        filters[index].childrens = new Array<TreeVisible>(task.children.length);
        
        return filters[index].visible= this.makeVisibilityTree(task.children,filters[index].childrens);
      }else{
        filters[index]= new TreeVisible();
        return filters[index].visible=  this.checkUsersFilters(task) && this.checkMilestonesFilters(task);
      }
    });
    return;
  }


  checkUsersFilters(task:Task): boolean {
    let flag:boolean = true;
    this.UsersFilters.forEach(user => {
      if(!task.taskPerformers.includes(user)) flag=false;
    });
    return flag;
  }


  checkMilestonesFilters(task:Task): boolean {
    let flag:boolean = true;
    this.MilestonesFilters.forEach(milestone => {
      if(!task.controlPointIds.includes(milestone)) flag=false;
    });
    return flag;
  }
}




class TreeVisible {
  visible: boolean;
  childrens : TreeVisible[]=[];
  constructor(){

  }
}
