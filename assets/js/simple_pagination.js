class Pagination
{
  constructor(params)
  {
    var validation = this.paramsValidation(params);
    if(validation.valid)
    {
      this.element = params.element;
      this.data = params.data;
      this.numberPerPage = params.pageSize;
      this.template = params.template;
      this.pageList = new Array();
      this.currentPage = 1;
      this.numberOfPages = 0;
      this.language = params.language;

      this.refresh();
    }
    else
      console.warn("Invalid data - \n"+validation.message);
  }

  paramsValidation(params)
  {
    var response = {valid:true,message:""};
    if(params.element.constructor !== String)
    {
      response.valid = false;
      response.message += "element param must be a String\n";
    }
    if(params.data.constructor !== Array)
    {
      response.valid = false;
      response.message += "data param must be an Array\n";
    }
    if(params.pageSize.constructor !== Number)
    {
      response.valid = false;
      response.message += "pageSize param must be a Number\n";
    }
    if(params.template.constructor !== Function && params.template.constructor.name !== 'AsyncFunction')
    {
      response.valid = false;
      response.message += "template param must be a Function\n";
    }
    
    return response;
  }

  setData(data)
  {
    if(data.constructor === Array)
    {
      this.data = data;
      this.refresh();
    }
    else
      console.warn("Data must be an array");
  }

  refresh()
  {
    this.makePaginationMenu(this.element,this.language);
    this.numberOfPages = this.getNumberOfPages();
    this.filterData();
  }

  makePaginationMenu(element,language)
  {
    if(language == undefined)
    {
      language = {
        showing:
        {
          showing: "Showing",
          to: "to",
          of: "of",
          entries: "entries"
        },
        navigation:
        {
          first: "First",
          previous: "Previous",
          next: "Next",
          last: "Last"
        },
        show:
        {
          show: "Show",
          entries: "entries"
        }
      }
    }
    
    var navigation = document.querySelectorAll(".pagination");
    for(var i = 0; i<navigation.length; i++)
      navigation[i].remove();

    var navigation_menu = document.createElement("div");
    navigation_menu.classList.add('pagination');
    navigation_menu.innerHTML = `
    <span class="pagination_showing">${language.showing.showing} <span class="pagination_from">1</span> ${language.showing.to} <span class="pagination_to">10</span> ${language.showing.of} <span class="pagination_of">0</span> ${language.showing.entries}</span>
    <a id="pagination_first" href="#" class="active" >${language.navigation.first}</a>
    <a id="pagination_previous" href="#" >&laquo; ${language.navigation.previous}</a>      
    <a id="pagination_next" href="#" >${language.navigation.next} &raquo;</a>      
    <a id="pagination_last" href="#" >${language.navigation.last}</a>
    <span class="pagination_show_entries">${language.show.show} <input class="pagination_page_input" type="number" value="10"/> ${language.show.entries}</span>
    `;    
    document.querySelector(`#${element}`).after(navigation_menu);

    // Add event listeners to navigation menu
    this.pageNavigationClick();
    this.pageInput();
  }

  pageNavigationClick()
  {
    var self = this;
    document.querySelector("#pagination_next").addEventListener("click",function(e){
      e.preventDefault();
      self.removeActive();
      this.classList.add("active");
      if(self.currentPage < self.numberOfPages)
      {
        self.currentPage += 1;
        self.filterData();
      }
    });

    document.querySelector("#pagination_previous").addEventListener("click",function(e){
      e.preventDefault();
      self.removeActive();
      this.classList.add("active");
      if(self.currentPage > 1)
      {
        self.currentPage -= 1;
        self.filterData();
      }      
    });

    document.querySelector("#pagination_first").addEventListener("click",function(e){
      e.preventDefault();
      self.removeActive();
      this.classList.add("active");
      self.currentPage = 1;
      self.filterData();
    });

    document.querySelector("#pagination_last").addEventListener("click",function(e){
      e.preventDefault();
      self.removeActive();
      this.classList.add("active");
      self.currentPage = self.numberOfPages;
      self.filterData();
    });
  }

  pageInput() 
  {
    var self = this;
    document.querySelector(".pagination_page_input").addEventListener("change",function(){
      self.numberPerPage = Number(this.value);
      self.numberOfPages = self.getNumberOfPages();
      self.currentPage = 1;
      self.removeActive();
      document.querySelector("#pagination_first").classList.add("active");

      self.filterData();
    });
  }

  removeActive()
  {
    var links = document.querySelectorAll(".pagination a");
    for(var i=0; i<links.length; i++)
      links[i].classList.remove("active");
  }
      
  getNumberOfPages() 
  {
    return Math.ceil(this.data.length / this.numberPerPage);
  }

  filterData() 
  {
    var begin = ((this.currentPage - 1) * this.numberPerPage);
    var end = begin + this.numberPerPage;

    this.pageList = this.data.slice(begin, end);
    
    document.querySelector(".pagination .pagination_from").innerHTML = Number(begin+1);
    document.querySelector(".pagination .pagination_to").innerHTML = Number(end);
    document.querySelector(".pagination .pagination_of").innerHTML = Number(this.data.length);

    // Renders template
    this.template(this.pageList);
    this.check();
  }

  check() 
  {
    document.querySelector("#pagination_next").disabled = this.currentPage == this.numberOfPages ? true : false;
    document.querySelector("#pagination_previous").disabled = this.currentPage == 1 ? true : false;
    document.querySelector("#pagination_first").disabled = this.currentPage == 1 ? true : false;
    document.querySelector("#pagination_last").disabled = this.currentPage == this.numberOfPages ? true : false;
  }
}