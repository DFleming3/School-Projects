#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAXSTRING 40

int main(int argc, char **argv) {

  FILE *file;

  struct wc {
    struct wc * next;
    char buf[MAXSTRING+1];
    int count;
   };
    
  char inbuf[MAXSTRING+1];
  int i;
   
  struct wc * head = NULL;
  file = fopen("gettysburg.words", "r");
    
  if (file == NULL) {
    perror("Error Opening File\n");
    exit(EXIT_FAILURE);
  }
    
  for (;;) {
    struct wc * new_node;
    if (fgets(inbuf, MAXSTRING+1, file) == NULL) break;
    for (i=0; i<MAXSTRING-1; i++){
      if(inbuf[i]=='\n'){
        inbuf[i]=0;
        break;
      }
    }
      
    new_node = malloc(sizeof(struct wc));
      
    if (new_node == NULL) {
      printf("Out of Memory\n");
      exit(0);
    }
     
    (*new_node).next = head;
    head = new_node;
    strcpy(new_node->buf, inbuf);
       
  }
   
  struct wc *first;
  struct wc *second;
   
  for (first=head; first!=NULL; first=first->next){
    for(second=head; second!=NULL; second=second->next){
      if (strcmp(first->buf,second->buf)==0){
        first->count++;
      }
    }
    printf("Word: %s | Frequency: %d\n",first->buf,first->count);
  }
}
