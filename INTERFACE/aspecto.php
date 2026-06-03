  
        <!--begin::App Main-->
        <main class="app-main"> <!--begin::App Content Header-->
            <div class="app-content-header"> <!--begin::Container-->
                <div class="container-fluid"> <!--begin::Row-->
                    <div class="row">
                        <div class="col-sm-6">
                            <h3 class="mb-0">GESTIÓN AMBIENTAL | ASPECTO AMBIENTAL </h3>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-end">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item active" aria-current="page">
                                PMA - ASPECTO AMBIENTAL
                                </li>
                            </ol>
                        </div>

                      <div class="col-12">

                            <div class="row" id="seec_pro">


                      
                              

                            </div>

    

                      </div>




                    </div> <!--end::Row-->
                </div> <!--end::Container-->
            </div> <!--end::App Content Header--> <!--begin::App Content-->
            <div class="app-content"> <!--begin::Container-->
                <div class="container-fluid"> <!--begin::Row-->
                    <div class="row">
                        <div class="col-12"> <!-- Default box -->
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">Gestionar Registros </h3>
                                    <div class="card-tools"> <button type="button" class="btn btn-tool" data-lte-toggle="card-collapse" title="Collapse"> <i data-lte-icon="expand" class="bi bi-plus-lg"></i> <i data-lte-icon="collapse" class="bi bi-dash-lg"></i> </button> <button type="button" class="btn btn-tool" data-lte-toggle="card-remove" title="Remove"> <i class="bi bi-x-lg"></i> </button> </div>
                                </div>
                                <div class="card-body">
                                  

                                <button class="btn btn-primary p-2 mt-2 mb-4" id="btn_reg"><i class="fas fa-user-plus"></i> Nuevo Registro</button>
                                
                                      
                                <div class="input-group mb-3 p-2 shadow mt-2 mb-2">
                                 <input type="text" class="form-control " placeholder="Buscar" id="searchTerm" onkeyup="doSearch()" />
                                <div class="input-group-text"> <span class="fas fa-search"></span></div>
                               </div>


                               <div class="shadow rounded">
                                <table class="  table-bordered table rounded p-2  " id="datatable">
                                        <thead>
                                            <tr class="">
                                                <th>N°</th>
                                                <th>ASPECTO AMBIENTAL</th>
                                                <th>SUBPLAN</th>
                                                <th>PLAN</th>
                                                
                                                
                                                <th>OPCIONES</th>
                                            </tr>
                                        </thead>
                                        <tbody  id="content_table">
                                          
                                        </tbody>
                                    </table>
                                  
                                    </div>
                                      
                              <div class="col-12" id="res_busqueda">

                              </div>
                                    <!-- Modal -->
                                    <div class="modal modal-lg fade" id="modal_pma" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5 text-uppeercase"  id="mod_title" >
                                                
                                            Modal title
                                        
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body" id="modal_body">

                                        
                                            
                                        
                                        
                                        
                                        
                                        
                                        </div>
                                        <div class="modal-footer " id="modal_footer">


                                         
                                        
                                        
                                        
                                        </div>
                                        </div>
                                    </div>
                                    </div>



                                    
                                </div> <!-- /.card-body -->
                                <div class="card-footer">

                                <ul class="pagination pagination-sm m-0 float-end">
                                        <li class="page-item"> <a class="page-link" href="#">&laquo;</a> </li>
                                        <li class="page-item"> <a class="page-link" href="#">1</a> </li>
                                        <li class="page-item"> <a class="page-link" href="#">2</a> </li>
                                        <li class="page-item"> <a class="page-link" href="#">3</a> </li>
                                        <li class="page-item"> <a class="page-link" href="#">&raquo;</a> </li>
                                    </ul>


                                </div> <!-- /.card-footer-->
                            </div> <!-- /.card -->
                        </div>
                    </div> <!--end::Row-->
                </div> <!--end::Container-->
            </div> <!--end::App Content-->
        </main> <!--end::App Main--> <!--begin::Footer-->
      



<!--MODAL OPCIONES-->
      






<div class="modal fade modal-md  col-sm-modal-sm" id="form_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">


            <div class="modal-header">
                <h1 class="modal-title fs-5 text-uppeercase" id="form_title">
                                                        
                                                 
                                                
                </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>


                <div class="modal-body" id="form_body">
                    



                </div>

                <div class="modal-footer" id="form_footer">
                
                
               
                    
                
                
                </div>
    </div>
  </div>
</div>


















        <script src="../JS/pma.apecto.fn.js"></script>
        <script src="../JS/fn_buscar.js"></script>