
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { QuizTopic, GenerateQuizOptions, generateQuiz } from '../services/aiService';
import { Award, BookOpen, Brain, Globe, Briefcase, GraduationCap, RefreshCw } from 'lucide-react';
import { Quiz } from '../types/quiz';

interface QuizGeneratorProps {
  onQuizGenerated: (quiz: Quiz) => void;
}

type FormValues = {
  topic: QuizTopic;
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
};

const QuizGenerator: React.FC<QuizGeneratorProps> = ({ onQuizGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    defaultValues: {
      topic: 'web-development',
      questionCount: 5,
      difficulty: 'medium',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsGenerating(true);
    
    try {
      const quiz = await generateQuiz({
        topic: data.topic,
        questionCount: data.questionCount,
        difficulty: data.difficulty,
      });
      
      toast({
        title: "Quiz generated!",
        description: `${quiz.questions.length} questions on ${quiz.title}`,
      });
      
      onQuizGenerated(quiz);
    } catch (error) {
      toast({
        title: "Failed to generate quiz",
        description: "An error occurred while generating the quiz.",
        variant: "destructive",
      });
      console.error("Error generating quiz:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Map topics to their icons
  const getTopicIcon = (topic: QuizTopic) => {
    switch (topic) {
      case 'web-development':
        return <Globe className="h-5 w-5" />;
      case 'artificial-intelligence':
        return <Brain className="h-5 w-5" />;
      case 'science-technology':
        return <BookOpen className="h-5 w-5" />;
      case 'general-knowledge':
        return <Award className="h-5 w-5" />;
      case 'corporate-skills':
        return <Briefcase className="h-5 w-5" />;
      case 'competitive-exams':
        return <GraduationCap className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 animate-fade-in">
      <Card className="border-accent bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl gradient-text">AI Quiz Generator</CardTitle>
          <CardDescription>
            Create fresh, relevant quizzes on various topics using our AI engine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="web-development">
                          <div className="flex items-center">
                            <Globe className="mr-2 h-4 w-4" />
                            <span>Web Development</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="artificial-intelligence">
                          <div className="flex items-center">
                            <Brain className="mr-2 h-4 w-4" />
                            <span>AI & Machine Learning</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="science-technology">
                          <div className="flex items-center">
                            <BookOpen className="mr-2 h-4 w-4" />
                            <span>Science & Technology</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="general-knowledge">
                          <div className="flex items-center">
                            <Award className="mr-2 h-4 w-4" />
                            <span>General Knowledge</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="corporate-skills">
                          <div className="flex items-center">
                            <Briefcase className="mr-2 h-4 w-4" />
                            <span>Corporate & Soft Skills</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="competitive-exams">
                          <div className="flex items-center">
                            <GraduationCap className="mr-2 h-4 w-4" />
                            <span>Competitive Exam Prep</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="questionCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Questions</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="3" 
                          max="20" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Between 3-20 questions
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full hover:scale-105 transition-transform"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating Quiz...
                    </>
                  ) : (
                    <>
                      {getTopicIcon(form.watch('topic'))}
                      <span className="ml-2">Generate Quiz</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizGenerator;
