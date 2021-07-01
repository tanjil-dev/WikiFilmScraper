from django.shortcuts import render
from django.views import View

import parse_data


class Parse_data(View):
    tem = "home.html"
    def get(self, request):
        parse_data.fn()
        render(request, template_name=self.tem)
