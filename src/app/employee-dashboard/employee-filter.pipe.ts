import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from 'rxjs';
import { EmployeeModel } from './employee-dashboard.model';
import * as $ from 'jquery';

@Pipe({
    name:'employeeFilter',
    pure:false
})
export class EmployeeFilterPipe implements PipeTransform{
    transform(employeeData:EmployeeModel[],searchTerm:string):EmployeeModel[] {
     console.log('searchbefore',employeeData)
        if(!employeeData || !searchTerm){
            //return alert("No Data Found");            
            return employeeData;     

        }     
        let serachResult=employeeData.filter(Empres=>Empres.firstName.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);        
      console.log('after',serachResult);
       if(serachResult.length>0)
       {
        $('#Nodata').hide();    
        return serachResult;
       }
       else{
           $('#Nodata').show();
           return serachResult;      
        // alert("No Data Found");
       }      
       
       // if(serachResult)
        // return employeeData.filter(Empres=>Empres.firstName.toLowerCase()||Empres.lastName.toLowerCase()
        // ||Empres.Email.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1)
    }
}